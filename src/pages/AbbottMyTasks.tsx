import { useAbbottProcess } from "@/context/AbbottProcessContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AbbottSLAChip } from "@/components/process/AbbottSLAChip";
import { Clock, FileText, User, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AbbottMyTasks() {
  const { getMyProcesses, currentRole } = useAbbottProcess();
  const navigate = useNavigate();
  const myProcesses = getMyProcesses();

  if (!currentRole) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">
              Faça login para ver suas etapas pendentes.
            </p>
            <Button className="mt-4" onClick={() => navigate("/abbott/login")}>
              Fazer Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Minhas Etapas</h1>
          <p className="text-muted-foreground">
            Processos aguardando sua ação como <span className="font-medium">{currentRole}</span>
          </p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          <User className="h-4 w-4 mr-2" />
          {currentRole}
        </Badge>
      </div>

      {myProcesses.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma etapa pendente</h3>
            <p className="text-muted-foreground">
              Você não possui processos aguardando sua ação no momento.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {myProcesses.map((process) => {
            const stepStart = process.stepsStart[process.currentStepId];
            
            return (
              <Card key={process.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{process.id}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Criado em {new Date(process.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    {stepStart && (
                      <AbbottSLAChip 
                        startedAt={stepStart.startedAt} 
                        slaHours={stepStart.slaHours} 
                      />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium mb-1">Solicitante</h4>
                      <p className="text-sm text-muted-foreground">
                        {process.data.nomeSolicitante || "Não informado"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Objetivo</h4>
                      <p className="text-sm text-muted-foreground">
                        {process.data.objetivo || "Não informado"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Urgência</h4>
                      <Badge 
                        variant={
                          process.data.urgencia === "Urgente" ? "destructive" : 
                          process.data.urgencia === "Médio" ? "secondary" : 
                          "outline"
                        }
                      >
                        {process.data.urgencia || "Não informado"}
                      </Badge>
                    </div>
                  </div>

                  {process.data.descricao && (
                    <div>
                      <h4 className="font-medium mb-1">Descrição</h4>
                      <p className="text-sm text-muted-foreground">
                        {process.data.descricao}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      Aguardando ação na etapa atual
                    </div>
                    <Button 
                      onClick={() => navigate(`/abbott/process/${process.id}`)}
                      className="flex items-center gap-2"
                    >
                      Continuar
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}