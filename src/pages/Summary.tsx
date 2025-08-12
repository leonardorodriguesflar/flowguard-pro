import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAbbottProcess } from "@/context/AbbottProcessContext";
import { exportCSV, exportPDF } from "@/utils/export";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Download, FileText } from "lucide-react";

export default function Summary() {
  const { id } = useParams();
  const { getProcess } = useAbbottProcess();
  const p = getProcess(id!);

  if (!p) return <div className="container mx-auto py-10">Processo não encontrado.</div>;

  return (
    <div className="container mx-auto py-8 space-y-6">
      <header className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-accent text-accent-foreground">
            <CheckCircle className="h-8 w-8" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground">Processo Concluído!</h1>
        <p className="text-muted-foreground">Resumo consolidado disponível para exportação</p>
      </header>

      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center border-b">
          <div className="flex items-center justify-center gap-3">
            <CardTitle className="text-2xl">{p.id}</CardTitle>
            <Badge variant="default" className="bg-accent text-accent-foreground">
              <CheckCircle className="h-3 w-3 mr-1" />
              Finalizado
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Criado em {new Date(p.createdAt).toLocaleDateString('pt-BR')}
          </p>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Dados principais */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground border-b pb-2">Informações Gerais</h3>
              <div className="space-y-3">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium text-muted-foreground">Solicitante</span>
                  <span className="text-sm">{p.data.nomeSolicitante || "N/A"}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium text-muted-foreground">Objetivo/Motivo</span>
                  <span className="text-sm">{p.data.objetivo || "N/A"}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium text-muted-foreground">Descrição</span>
                  <span className="text-sm">{p.data.descricao || "N/A"}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium text-muted-foreground">Item Nacional</span>
                  <span className="text-sm">{p.data.itemNacional ? "Sim" : "Não"}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium text-muted-foreground">Urgência</span>
                  <Badge variant="outline" className="w-fit">
                    {p.data.urgencia || "Médio"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Dados técnicos */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground border-b pb-2">Dados Técnicos</h3>
              <div className="space-y-3">
                {p.data.tipoCadastro && (
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm font-medium text-muted-foreground">Tipo de Cadastro</span>
                    <span className="text-sm">{p.data.tipoCadastro}</span>
                  </div>
                )}
                {p.data.temperaturaMDG && (
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm font-medium text-muted-foreground">Temperatura MDG</span>
                    <span className="text-sm">{p.data.temperaturaMDG}</span>
                  </div>
                )}
                {p.data.ncmCode && (
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm font-medium text-muted-foreground">NCM Code</span>
                    <span className="text-sm">{p.data.ncmCode}</span>
                  </div>
                )}
                {p.data.requerParametrizacao !== undefined && (
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm font-medium text-muted-foreground">Requer Parametrização</span>
                    <span className="text-sm">{p.data.requerParametrizacao ? "Sim" : "Não"}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Histórico resumido */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground border-b pb-2">Histórico do Processo</h3>
            <div className="space-y-2">
              {p.history.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhum histórico registrado.</p>
              ) : (
                p.history.slice(0, 5).reverse().map((entry, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
                    <div>
                      <span className="text-sm font-medium">{entry.responsible}</span>
                      <p className="text-xs text-muted-foreground">
                        {entry.action === "sent" ? "Enviou para próxima etapa" : "Salvou rascunho"}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(entry.when).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Botões de exportação */}
          <div className="flex items-center justify-center gap-4 pt-6 border-t">
            <Button onClick={() => exportPDF(p)} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Baixar PDF
            </Button>
            <Button variant="outline" onClick={() => exportCSV(p)} className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Exportar CSV
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
