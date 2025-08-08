import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { HistoryPanel } from "@/components/process/HistoryPanel";
import { SLAChip } from "@/components/process/SLAChip";
import { STEPS, useProcess } from "@/context/ProcessContext";

export default function ProcessForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getProcess, saveDraft, sendToNext, currentRole } = useProcess();
  const process = getProcess(id!);

  const currentDef = useMemo(() => STEPS.find((s) => s.id === process?.currentStepId), [process]);
  const editable = !!(currentRole && currentDef && currentDef.responsible === currentRole);
  const [local, setLocal] = useState<Record<string, any>>(() => ({ ...(process?.data || {}) }));

  useEffect(() => {
    document.title = `Processo ${process?.id || "-"}`;
  }, [process?.id]);

  if (!process) return <div className="container mx-auto py-10">Processo não encontrado.</div>;

  function onSave() {
    saveDraft(process.id, local);
    toast({ title: "Rascunho salvo", description: "Você pode continuar depois." });
  }

  function onSend() {
    // Validações mínimas por etapa
    const step = process.currentStepId;
    if (step === "primary") {
      if (!local.nomeSolicitante || local.itemNacional === undefined || local.temProposta === undefined) {
        toast({ title: "Preencha os campos obrigatórios (*)", description: "Verifique o formulário." });
        return;
      }
    }
    if (step === "taxSystems" && local.requerParametrizacao === true && !local.parametrizacaoRealizada) {
      toast({ title: "Informe a parametrização realizada", description: "Campo obrigatório." });
      return;
    }

    saveDraft(process.id, local); // snapshot
    sendToNext(process.id);
    toast({ title: "Enviado", description: "Próximo responsável notificado (mock)." });
    if (step === "closure") navigate(`/summary/${process.id}`);
  }

  function FieldRow({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
    return (
      <div className="grid gap-2">
        <Label>
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
        {children}
      </div>
    );
  }

  function PrimaryFields() {
    return (
      <div className="grid gap-4">
        <FieldRow label="Nome do solicitante" required>
          <Input value={local.nomeSolicitante || ""} disabled={!editable} onChange={(e)=>setLocal({ ...local, nomeSolicitante: e.target.value })} />
        </FieldRow>
        <FieldRow label="Data/hora de abertura">
          <Input value={new Date(process.createdAt).toLocaleString()} disabled />
        </FieldRow>
        <FieldRow label="Objetivo/Motivo comercial" required>
          <Textarea value={local.objetivo || ""} disabled={!editable} onChange={(e)=>setLocal({ ...local, objetivo: e.target.value })} />
        </FieldRow>
        <FieldRow label="Descrição/Marca/Especificações">
          <Textarea value={local.descricao || ""} disabled={!editable} onChange={(e)=>setLocal({ ...local, descricao: e.target.value })} />
        </FieldRow>
        <div className="grid sm:grid-cols-2 gap-4">
          <FieldRow label="Item nacional?" required>
            <div className="flex items-center gap-3">
              <Switch checked={local.itemNacional === true} disabled={!editable} onCheckedChange={(v)=>setLocal({ ...local, itemNacional: v })} />
              <span className="text-sm text-muted-foreground">{local.itemNacional ? "Sim" : "Não"}</span>
            </div>
          </FieldRow>
          <FieldRow label="Tem proposta comercial?" required>
            <div className="flex items-center gap-3">
              <Switch checked={local.temProposta === true} disabled={!editable} onCheckedChange={(v)=>setLocal({ ...local, temProposta: v })} />
              <span className="text-sm text-muted-foreground">{local.temProposta ? "Sim" : "Não"}</span>
            </div>
          </FieldRow>
        </div>
        {local.temProposta === true && (
          <FieldRow label="Anexar proposta (nome do arquivo)">
            <Input placeholder="proposta.pdf" disabled={!editable} value={(local.propostaAnexo?.[0] || "")} onChange={(e)=>setLocal({ ...local, propostaAnexo: [e.target.value] })} />
            <p className="text-xs text-muted-foreground">Upload real será habilitado após integração com backend.</p>
          </FieldRow>
        )}
        <FieldRow label="Urgência">
          <select className="h-10 rounded-md border bg-background px-3" disabled={!editable} value={local.urgencia || "Média"} onChange={(e)=>setLocal({ ...local, urgencia: e.target.value })}>
            <option>Baixa</option>
            <option>Média</option>
            <option>Alta</option>
          </select>
        </FieldRow>
      </div>
    );
  }

  function GenericTextarea({ label }: { label: string }) {
    return (
      <FieldRow label={label} required>
        <Textarea value={local[label] || ""} disabled={!editable} onChange={(e)=>setLocal({ ...local, [label]: e.target.value })} />
      </FieldRow>
    );
  }

  function TaxSystemsFields() {
    return (
      <div className="grid gap-4">
        <FieldRow label="Requer parametrização?" required>
          <div className="flex items-center gap-3">
            <Switch checked={local.requerParametrizacao === true} disabled={!editable} onCheckedChange={(v)=>setLocal({ ...local, requerParametrizacao: v })} />
            <span className="text-sm text-muted-foreground">{local.requerParametrizacao ? "Sim" : "Não"}</span>
          </div>
        </FieldRow>
        {local.requerParametrizacao === true && (
          <FieldRow label="Parametrização realizada" required>
            <Textarea value={local.parametrizacaoRealizada || ""} disabled={!editable} onChange={(e)=>setLocal({ ...local, parametrizacaoRealizada: e.target.value })} />
          </FieldRow>
        )}
      </div>
    );
  }

  function renderStepForm() {
    switch (process.currentStepId) {
      case "primary":
        return <PrimaryFields />;
      case "services":
        return <GenericTextarea label="avaliacaoServicos" />;
      case "fiscal":
        return (
          <div className="grid gap-4">
            <GenericTextarea label="verificacaoTributaria" />
            <GenericTextarea label="regrasICMS" />
          </div>
        );
      case "regulatory":
        return <GenericTextarea label="requisitosLegais" />;
      case "requester":
        return <GenericTextarea label="dadosSistemaExterno" />;
      case "finance":
        return <GenericTextarea label="impactoFinanceiro" />;
      case "costs":
        return <GenericTextarea label="aprovacaoCustos" />;
      case "supply":
        return <GenericTextarea label="disponibilidade" />;
      case "taxSystems":
        return <TaxSystemsFields />;
      case "closure":
        return (
          <div className="grid gap-4">
            <FieldRow label="Processo concluído">
              <div className="flex items-center gap-3">
                <Switch checked={!!local.processoConcluido} disabled={!editable} onCheckedChange={(v)=>setLocal({ ...local, processoConcluido: v })} />
                <span className="text-sm text-muted-foreground">Marque quando pronto.</span>
              </div>
            </FieldRow>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground">Processo</span>
                  <span className="font-semibold">{process.id}</span>
                  <span className="hidden sm:inline text-muted-foreground">/</span>
                  <span>{currentDef?.title}</span>
                </div>
                <SLAChip startedAt={process.stepsStart[process.currentStepId]?.startedAt} slaHours={process.stepsStart[process.currentStepId]?.slaHours ?? 0} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!editable && (
                <div className="mb-4 rounded-md border bg-accent p-3 text-sm">
                  Você tem acesso de leitura nesta etapa. Somente {currentDef?.responsible} pode editar.
                </div>
              )}
              <div className="space-y-6">
                {renderStepForm()}
                <div className="flex items-center justify-between pt-2">
                  <Button variant="secondary" onClick={onSave}>Salvar e continuar depois</Button>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={()=>navigate(-1)}>Voltar</Button>
                    <Button onClick={onSend}>Enviar para próximo responsável</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <HistoryPanel process={process} />
      </div>
    </div>
  );
}
