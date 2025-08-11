import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAbbottProcess, ABBOTT_STEPS } from "@/context/AbbottProcessContext";
import { AbbottSLAChip } from "@/components/process/AbbottSLAChip";
import { Clock, Plus, Search, Filter, FileText, CheckCircle, AlertCircle } from "lucide-react";

export default function AbbottDashboard() {
  const navigate = useNavigate();
  const { processes, getMyProcesses, currentRole } = useAbbottProcess();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const myProcesses = getMyProcesses();
  const completedProcesses = processes.filter(p => p.closed);
  
  const getStatusVariant = (process: any) => {
    if (process.closed) return "default";
    const step = ABBOTT_STEPS.find(s => s.id === process.currentStepId);
    if (!step) return "secondary";
    
    const stepStart = process.stepsStart[process.currentStepId];
    if (!stepStart || step.slaHours === "TBC") return "secondary";
    
    const now = Date.now();
    const slaMs = step.slaHours * 3600 * 1000;
    const elapsed = now - stepStart.startedAt;
    
    if (elapsed > slaMs) return "destructive";
    if (elapsed > slaMs * 0.8) return "secondary";
    return "default";
  };

  const filteredProcesses = processes.filter(p => {
    const matchesSearch = p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.data.nomeSolicitante?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.data.objetivo?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === "pending") return !p.closed && matchesSearch;
    if (statusFilter === "completed") return p.closed && matchesSearch;
    return matchesSearch;
  });

  const stats = {
    total: processes.length,
    pending: processes.filter(p => !p.closed).length,
    completed: processes.filter(p => p.closed).length,
    myTasks: myProcesses.length,
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Central de controle do Abbott Process Manager
          </p>
        </div>
        <Button onClick={() => navigate("/process/nova")} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nova Solicitação
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-secondary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Em Andamento</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-accent" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Concluídos</p>
                <p className="text-2xl font-bold">{stats.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-warning" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Minhas Tarefas</p>
                <p className="text-2xl font-bold">{stats.myTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">Todos os Processos</TabsTrigger>
          <TabsTrigger value="my-tasks">Minhas Tarefas</TabsTrigger>
          <TabsTrigger value="completed">Concluídos</TabsTrigger>
        </TabsList>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por ID, solicitante ou objetivo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending">Em andamento</SelectItem>
              <SelectItem value="completed">Concluídos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-4">
            {filteredProcesses.map((process) => {
              const currentStep = ABBOTT_STEPS.find(s => s.id === process.currentStepId);
              return (
                <Card key={process.id} className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => navigate(`/process/${process.id}`)}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{process.id}</h3>
                          <Badge variant={getStatusVariant(process)}>
                            {process.closed ? "Concluído" : currentStep?.title || "Em andamento"}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-1">
                          <span className="font-medium">Solicitante:</span> {process.data.nomeSolicitante}
                        </p>
                        <p className="text-muted-foreground text-sm mb-1">
                          <span className="font-medium">Objetivo:</span> {process.data.objetivo || "Não informado"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Criado em {new Date(process.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        {!process.closed && currentStep && (
                          <AbbottSLAChip 
                            startedAt={process.stepsStart[process.currentStepId]?.startedAt}
                            slaHours={currentStep.slaHours}
                          />
                        )}
                        <Badge variant="outline" className="text-xs">
                          {process.data.urgencia || "Médio"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            {filteredProcesses.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nenhum processo encontrado</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm || statusFilter !== "all" 
                      ? "Tente ajustar os filtros de busca"
                      : "Comece criando uma nova solicitação"}
                  </p>
                  {!searchTerm && statusFilter === "all" && (
                    <Button onClick={() => navigate("/process/nova")}>
                      <Plus className="h-4 w-4 mr-2" />
                      Nova Solicitação
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="my-tasks" className="mt-6">
          <div className="space-y-4">
            {myProcesses.map((process) => {
              const currentStep = ABBOTT_STEPS.find(s => s.id === process.currentStepId);
              return (
                <Card key={process.id} className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-primary"
                      onClick={() => navigate(`/process/${process.id}`)}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{process.id}</h3>
                          <Badge variant="secondary">{currentStep?.title}</Badge>
                          <Badge variant="outline" className="text-primary border-primary">
                            Sua vez!
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-1">
                          <span className="font-medium">Solicitante:</span> {process.data.nomeSolicitante}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          <span className="font-medium">Objetivo:</span> {process.data.objetivo || "Não informado"}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        {currentStep && (
                          <AbbottSLAChip 
                            startedAt={process.stepsStart[process.currentStepId]?.startedAt}
                            slaHours={currentStep.slaHours}
                          />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            {myProcesses.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nenhuma tarefa pendente</h3>
                  <p className="text-muted-foreground">
                    Você está em dia! Não há processos aguardando sua ação no momento.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="space-y-4">
            {completedProcesses.map((process) => (
              <Card key={process.id} className="hover:shadow-lg transition-shadow cursor-pointer opacity-75"
                    onClick={() => navigate(`/summary/${process.id}`)}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{process.id}</h3>
                        <Badge variant="default" className="bg-accent text-accent-foreground">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Concluído
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-1">
                        <span className="font-medium">Solicitante:</span> {process.data.nomeSolicitante}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        <span className="font-medium">Objetivo:</span> {process.data.objetivo || "Não informado"}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Finalizado
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {completedProcesses.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nenhum processo concluído</h3>
                  <p className="text-muted-foreground">
                    Os processos finalizados aparecerão aqui.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}