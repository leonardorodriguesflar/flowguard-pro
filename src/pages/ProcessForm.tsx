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
      if (!local.nomeSolicitante || local.itemNacional === undefined || local.temProposta === undefined || !local.tipoCadastro || !local.objetivo || !local.descricao || !local.urgencia) {
        toast({ title: "Preencha os campos obrigatórios (*)", description: "Verifique o formulário." });
        return;
      }
    }
    if (step === "services" && local.tipoCadastro === "Peças") {
      if (!local.ncmCode || String(local.ncmCode).length !== 8) {
        toast({ title: "Informe NCM com 8 dígitos", description: "Campo obrigatório para Peças." });
        return;
      }
    }
    if (step === "fiscal" && local.requerParametrizacao === undefined) {
      toast({ title: "Selecione se requer parametrização", description: "Campo obrigatório." });
      return;
    }
    if (step === "finance" && local.validadoMarcacaoCusto === undefined) {
      toast({ title: "Informe a validação de marcação de custo", description: "Campo obrigatório." });
      return;
    }
    if (step === "costs" && local.custoMarcado === true && !local.marcadoEm) {
      toast({ title: "Informe a data/hora de marcação", description: "Obrigatório quando 'Custo marcado' = Sim." });
      return;
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
        <FieldRow label="Descrição/Marca/Especificações" required>
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
          <div className="rounded-md border bg-accent p-3 text-sm">
            Instrução: Envie a proposta comercial diretamente ao Requisitante.
          </div>
        )}
        <div className="grid sm:grid-cols-2 gap-4">
          <FieldRow label="Urgência" required>
            <select className="h-10 rounded-md border bg-background px-3" disabled={!editable} value={local.urgencia || "Média"} onChange={(e)=>setLocal({ ...local, urgencia: e.target.value })}>
              <option>Baixa</option>
              <option>Média</option>
              <option>Alta</option>
            </select>
          </FieldRow>
          <FieldRow label="Tipo de Cadastro" required>
            <select className="h-10 rounded-md border bg-background px-3" disabled={!editable} value={local.tipoCadastro || ""} onChange={(e)=>setLocal({ ...local, tipoCadastro: e.target.value })}>
              <option value="">Selecione...</option>
              <option value="Peças">Peças</option>
              <option value="Outros">Outros</option>
            </select>
          </FieldRow>
        </div>
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

  function ServicesFields() {
    const isPecas = local.tipoCadastro === "Peças";
    return (
      <div className="grid gap-4">
        {isPecas ? (
          <>
            <FieldRow label="Temperatura de MDG (para peças)">
              <Input value={local.temperaturaMDG || ""} disabled={!editable} onChange={(e)=>setLocal({ ...local, temperaturaMDG: e.target.value })} />
            </FieldRow>
            <FieldRow label="NCM Code (8 dígitos)">
              <Input value={local.ncmCode || ""} disabled={!editable} onChange={(e)=>setLocal({ ...local, ncmCode: e.target.value.replace(/[^0-9]/g, '').slice(0,8) })} placeholder="00000000" />
              <p className="text-xs text-muted-foreground">Somente números. Ex.: 12345678</p>
            </FieldRow>
          </>
        ) : (
          <GenericTextarea label="avaliacaoServicos" />
        )}
      </div>
    );
  }

  function FiscalFields() {
    return (
      <div className="grid gap-4">
        <FieldRow label="Requer parametrização?" required>
          <div className="flex items-center gap-3">
            <Switch checked={local.requerParametrizacao === true} disabled={!editable} onCheckedChange={(v)=>setLocal({ ...local, requerParametrizacao: v })} />
            <span className="text-sm text-muted-foreground">{local.requerParametrizacao ? "Sim" : "Não"}</span>
          </div>
        </FieldRow>
        <GenericTextarea label="verificacaoTributaria" />
        <GenericTextarea label="regrasICMS" />
      </div>
    );
  }

  function RequesterFields() {
    return (
      <div className="grid gap-4">
        <FieldRow label="Data e hora de Inclusão">
          <Input type="datetime-local" value={local.dadosInclusaoData || ""} disabled={!editable} onChange={(e)=>setLocal({ ...local, dadosInclusaoData: e.target.value })} />
        </FieldRow>
        <GenericTextarea label="dadosSistemaExterno" />
      </div>
    );
  }

  function FinanceFields() {
    return (
      <div className="grid gap-4">
        <FieldRow label="Validado para marcação de custo?" required>
          <div className="flex items-center gap-3">
            <Switch checked={local.validadoMarcacaoCusto === true} disabled={!editable} onCheckedChange={(v)=>setLocal({ ...local, validadoMarcacaoCusto: v })} />
            <span className="text-sm text-muted-foreground">{local.validadoMarcacaoCusto ? "Sim" : "Não"}</span>
          </div>
        </FieldRow>
        <FieldRow label="Data de envio para marcação">
          <Input type="datetime-local" value={local.dataEnvioMarcacao || ""} disabled={!editable} onChange={(e)=>setLocal({ ...local, dataEnvioMarcacao: e.target.value })} />
        </FieldRow>
      </div>
    );
  }

  function CostsFields() {
    return (
      <div className="grid gap-4">
        <FieldRow label="Custo marcado" required>
          <div className="flex items-center gap-3">
            <Switch checked={local.custoMarcado === true} disabled={!editable} onCheckedChange={(v)=>setLocal({ ...local, custoMarcado: v })} />
            <span className="text-sm text-muted-foreground">{local.custoMarcado ? "Sim" : "Não"}</span>
          </div>
        </FieldRow>
        <FieldRow label="Marcado em">
          <Input type="datetime-local" value={local.marcadoEm || ""} disabled={!editable} onChange={(e)=>setLocal({ ...local, marcadoEm: e.target.value })} />
        </FieldRow>
      </div>
    );
  }

  function SupplyFields() {
    const isPecas = local.tipoCadastro === "Peças";
    return (
      <div className="grid gap-4">
        <FieldRow label="Data MDG Finalizado (A3)">
          <Input type="date" value={local.dataMDGFinalizado || ""} disabled={!editable} onChange={(e)=>setLocal({ ...local, dataMDGFinalizado: e.target.value })} />
        </FieldRow>
        {isPecas && (
          <FieldRow label="Reorder Point atualizado no ADDONE?">
            <div className="flex items-center gap-3">
              <Switch checked={local.reorderPointAtualizado === true} disabled={!editable} onCheckedChange={(v)=>setLocal({ ...local, reorderPointAtualizado: v })} />
              <span className="text-sm text-muted-foreground">{local.reorderPointAtualizado ? "Sim" : "Não"}</span>
            </div>
          </FieldRow>
        )}
      </div>
    );
  }

  function TaxSystemsFields() {
    return (
      <div className="grid gap-4">
        <FieldRow label="Parametrização realizada" required>
          <Textarea value={local.parametrizacaoRealizada || ""} disabled={!editable} onChange={(e)=>setLocal({ ...local, parametrizacaoRealizada: e.target.value })} />
        </FieldRow>
        <p className="text-xs text-muted-foreground">SLA: TBC</p>
      </div>
    );
  }

  function renderStepForm() {
    switch (process.currentStepId) {
      case "primary":
        return <PrimaryFields />;
      case "services":
        return <ServicesFields />;
      case "fiscal":
        return <FiscalFields />;
      case "regulatory":
        return <GenericTextarea label="requisitosLegais" />;
      case "requester":
        return <RequesterFields />;
      case "finance":
        return <FinanceFields />;
      case "costs":
        return <CostsFields />;
      case "supply":
        return <SupplyFields />;
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
