import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProcess } from "@/context/ProcessContext";
import { exportCSV, exportPDF } from "@/utils/export";

export default function Summary() {
  const { id } = useParams();
  const { getProcess } = useProcess();
  const p = getProcess(id!);

  if (!p) return <div className="container mx-auto py-10">Processo não encontrado.</div>;

  return (
    <div className="container mx-auto py-8 space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Processo concluído com sucesso</h1>
        <p className="text-muted-foreground">Veja o resumo consolidado e exporte os dados.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>{p.id}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {Object.entries(p.data).map(([k, v]) => (
              <div key={k} className="rounded border p-3">
                <div className="text-xs text-muted-foreground">{k}</div>
                <div className="text-sm">{String(v)}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button onClick={()=>exportPDF(p)}>Baixar PDF</Button>
            <Button variant="outline" onClick={()=>exportCSV(p)}>Exportar CSV</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
