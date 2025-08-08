import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProcess } from "@/context/ProcessContext";
import { SLAChip } from "@/components/process/SLAChip";

export default function Dashboard() {
  const { processes, createProcess } = useProcess();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Portal de Processos — Dashboard";
  }, []);

  function handleNew() {
    const p = createProcess();
    navigate(`/process/${p.id}`);
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Acompanhe processos e SLAs</p>
        </div>
        <Button onClick={handleNew}>Nova Solicitação</Button>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {processes.map((p) => (
          <Card key={p.id} className="hover:shadow-md transition-shadow" onClick={()=>navigate(`/process/${p.id}`)}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{p.id}</span>
                <SLAChip startedAt={p.stepsStart[p.currentStepId]?.startedAt} slaHours={p.stepsStart[p.currentStepId]?.slaHours ?? 0} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Etapa atual: <strong>{p.currentStepId}</strong></p>
              <p className="text-sm text-muted-foreground">Status: {p.closed ? "Concluído" : "Em andamento"}</p>
            </CardContent>
          </Card>
        ))}
        {processes.length === 0 && (
          <Card>
            <CardContent className="py-10 text-center text-muted-foreground">Nenhum processo ainda. Crie sua primeira solicitação.</CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
