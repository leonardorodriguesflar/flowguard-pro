import { useAbbottProcess, ABBOTT_STEPS } from "@/context/AbbottProcessContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { History, Search, Filter, Download, Eye, Calendar } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function AbbottHistory() {
  const { processes } = useAbbottProcess();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [responsibleFilter, setResponsibleFilter] = useState("all");

  const filteredProcesses = useMemo(() => {
    return processes.filter(process => {
      // Search filter
      const matchesSearch = searchTerm === "" || 
        process.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (process.data.nomeSolicitante || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (process.data.objetivo || "").toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter
      const matchesStatus = statusFilter === "all" ||
        (statusFilter === "completed" && process.closed) ||
        (statusFilter === "active" && !process.closed);

      // Responsible filter
      const currentStep = ABBOTT_STEPS.find(s => s.id === process.currentStepId);
      const matchesResponsible = responsibleFilter === "all" ||
        currentStep?.responsible === responsibleFilter;

      return matchesSearch && matchesStatus && matchesResponsible;
    });
  }, [processes, searchTerm, statusFilter, responsibleFilter]);

  const uniqueResponsibles = useMemo(() => {
    const responsibles = new Set<string>();
    processes.forEach(p => {
      const step = ABBOTT_STEPS.find(s => s.id === p.currentStepId);
      if (step) responsibles.add(step.responsible);
    });
    return Array.from(responsibles);
  }, [processes]);

  const getStepTitle = (stepId: string) => {
    return ABBOTT_STEPS.find(s => s.id === stepId)?.title || stepId;
  };

  const getStatusBadge = (process: any) => {
    if (process.closed) {
      return <Badge className="bg-accent text-accent-foreground">Concluído</Badge>;
    }
    return <Badge variant="secondary">Em andamento</Badge>;
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Histórico Completo</h1>
          <p className="text-muted-foreground">
            Visualize todos os processos e suas etapas
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Exportar Relatório
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por ID, solicitante ou objetivo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="active">Em andamento</SelectItem>
                <SelectItem value="completed">Concluído</SelectItem>
              </SelectContent>
            </Select>
            <Select value={responsibleFilter} onValueChange={setResponsibleFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Responsável" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os responsáveis</SelectItem>
                {uniqueResponsibles.map(responsible => (
                  <SelectItem key={responsible} value={responsible}>
                    {responsible}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center text-sm text-muted-foreground">
              {filteredProcesses.length} de {processes.length} processos
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Process List */}
      <div className="space-y-4">
        {filteredProcesses.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum processo encontrado</h3>
              <p className="text-muted-foreground">
                Tente ajustar os filtros ou criar um novo processo.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredProcesses.map((process) => (
            <Card key={process.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold">{process.id}</h3>
                      {getStatusBadge(process)}
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(process.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <span className="text-sm font-medium">Solicitante:</span>
                        <p className="text-sm text-muted-foreground">
                          {process.data.nomeSolicitante || "Não informado"}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Etapa atual:</span>
                        <p className="text-sm text-muted-foreground">
                          {getStepTitle(process.currentStepId)}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Urgência:</span>
                        <Badge 
                          variant={
                            process.data.urgencia === "Urgente" ? "destructive" : 
                            process.data.urgencia === "Médio" ? "secondary" : 
                            "outline"
                          }
                          className="ml-2"
                        >
                          {process.data.urgencia || "Não informado"}
                        </Badge>
                      </div>
                    </div>

                    {process.data.objetivo && (
                      <div>
                        <span className="text-sm font-medium">Objetivo:</span>
                        <p className="text-sm text-muted-foreground mt-1">
                          {process.data.objetivo}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <History className="h-3 w-3" />
                      {process.history.length} registro(s) no histórico
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/abbott/process/${process.id}`)}
                    className="flex items-center gap-2 ml-4"
                  >
                    <Eye className="h-4 w-4" />
                    Ver Detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}