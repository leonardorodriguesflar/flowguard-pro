import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAbbottProcess, ABBOTT_STEPS } from "@/context/AbbottProcessContext";
import { AbbottSLAChip } from "@/components/process/AbbottSLAChip";
import { HistoryPanel } from "@/components/process/HistoryPanel";
import { toast } from "sonner";
import { Save, Send, ArrowLeft, Clock, User, AlertCircle } from "lucide-react";

export default function AbbottProcessForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProcess, saveDraft, sendToNext, currentRole } = useAbbottProcess();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [notes, setNotes] = useState("");
  
  const process = getProcess(id!);
  
  useEffect(() => {
    if (process) {
      setFormData(process.data);
    }
  }, [process]);

  if (!process) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Processo não encontrado</h1>
        <Button onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao Dashboard
        </Button>
      </div>
    );
  }

  const currentStep = ABBOTT_STEPS.find(s => s.id === process.currentStepId);
  const canEdit = currentStep?.responsible === currentRole;

  const handleSave = () => {
    saveDraft(process.id, formData);
    toast.success("Rascunho salvo com sucesso!");
  };

  const handleSend = () => {
    if (!validateCurrentStep()) return;
    
    sendToNext(process.id, notes || undefined);
    toast.success("Processo enviado para a próxima etapa!", {
      description: "Notificação automática enviada ao próximo responsável"
    });
    navigate("/dashboard");
  };

  const validateCurrentStep = () => {
    const required = getRequiredFields();
    for (const field of required) {
      if (!formData[field]) {
        toast.error(`Campo obrigatório não preenchido: ${getFieldLabel(field)}`);
        return false;
      }
    }
    return true;
  };

  const getRequiredFields = () => {
    switch (process.currentStepId) {
      case "primary":
        return ["nomeSolicitante", "objetivo", "descricao", "itemNacional", "urgencia"];
      case "services":
        return formData.tipoCadastro === "Peças" ? ["tipoCadastro", "temperaturaMDG", "ncmCode"] : ["tipoCadastro"];
      case "fiscal":
        return ["requerParametrizacao"];
      default:
        return [];
    }
  };

  const getFieldLabel = (field: string) => {
    const labels: Record<string, string> = {
      nomeSolicitante: "Nome do Solicitante",
      objetivo: "Objetivo/Motivo Comercial",
      descricao: "Descrição/Marca/Especificações",
      itemNacional: "Item Nacional?",
      urgencia: "Urgência",
      tipoCadastro: "Tipo de Cadastro",
      temperaturaMDG: "Temperatura de MDG",
      ncmCode: "NCM Code",
      requerParametrizacao: "Requer Parametrização?",
    };
    return labels[field] || field;
  };

  const renderStepFields = () => {
    switch (process.currentStepId) {
      case "primary":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nomeSolicitante">Nome do Solicitante *</Label>
              <Input
                id="nomeSolicitante"
                value={formData.nomeSolicitante || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, nomeSolicitante: e.target.value }))}
                disabled={!canEdit}
                className={!canEdit ? "bg-muted" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="objetivo">Objetivo / Motivo Comercial *</Label>
              <Textarea
                id="objetivo"
                value={formData.objetivo || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, objetivo: e.target.value }))}
                disabled={!canEdit}
                className={!canEdit ? "bg-muted" : ""}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição / Marca / Especificações *</Label>
              <Textarea
                id="descricao"
                value={formData.descricao || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
                disabled={!canEdit}
                className={!canEdit ? "bg-muted" : ""}
                rows={3}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="itemNacional">Item Nacional? *</Label>
                <Select 
                  value={formData.itemNacional?.toString() || ""} 
                  onValueChange={(value) => setFormData(prev => ({ 
                    ...prev, 
                    itemNacional: value === "true" 
                  }))}
                  disabled={!canEdit}
                >
                  <SelectTrigger className={!canEdit ? "bg-muted" : ""}>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Sim</SelectItem>
                    <SelectItem value="false">Não</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgencia">Urgência *</Label>
                <Select 
                  value={formData.urgencia || ""} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, urgencia: value }))}
                  disabled={!canEdit}
                >
                  <SelectTrigger className={!canEdit ? "bg-muted" : ""}>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Urgente">Urgente</SelectItem>
                    <SelectItem value="Médio">Médio</SelectItem>
                    <SelectItem value="Baixo">Baixo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="temProposta">Tem proposta comercial?</Label>
              <Select 
                value={formData.temProposta?.toString() || ""} 
                onValueChange={(value) => setFormData(prev => ({ 
                  ...prev, 
                  temProposta: value === "true" 
                }))}
                disabled={!canEdit}
              >
                <SelectTrigger className={!canEdit ? "bg-muted" : ""}>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Sim</SelectItem>
                  <SelectItem value="false">Não</SelectItem>
                </SelectContent>
              </Select>
              {formData.temProposta === true && (
                <p className="text-sm text-muted-foreground bg-accent/10 p-3 rounded-lg border">
                  <AlertCircle className="h-4 w-4 inline mr-2" />
                  Instrução: Envie a proposta comercial ao Requisitante quando o processo chegar nessa etapa.
                </p>
              )}
            </div>
          </div>
        );

      case "services":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="tipoCadastro">Tipo de Cadastro *</Label>
              <Select 
                value={formData.tipoCadastro || ""} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, tipoCadastro: value }))}
                disabled={!canEdit}
              >
                <SelectTrigger className={!canEdit ? "bg-muted" : ""}>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Peças">Peças</SelectItem>
                  <SelectItem value="Outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.tipoCadastro === "Peças" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="temperaturaMDG">Temperatura de MDG *</Label>
                  <Input
                    id="temperaturaMDG"
                    value={formData.temperaturaMDG || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, temperaturaMDG: e.target.value }))}
                    disabled={!canEdit}
                    className={!canEdit ? "bg-muted" : ""}
                    placeholder="Ex: -20°C a +25°C"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ncmCode">NCM Code *</Label>
                  <Input
                    id="ncmCode"
                    value={formData.ncmCode || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, ncmCode: e.target.value }))}
                    disabled={!canEdit}
                    className={!canEdit ? "bg-muted" : ""}
                    placeholder="Ex: 9027.80.99"
                  />
                </div>
              </>
            )}
          </div>
        );

      case "fiscal":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="requerParametrizacao">Requer parametrização? *</Label>
              <Select 
                value={formData.requerParametrizacao?.toString() || ""} 
                onValueChange={(value) => setFormData(prev => ({ 
                  ...prev, 
                  requerParametrizacao: value === "true" 
                }))}
                disabled={!canEdit}
              >
                <SelectTrigger className={!canEdit ? "bg-muted" : ""}>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Sim</SelectItem>
                  <SelectItem value="false">Não</SelectItem>
                </SelectContent>
              </Select>
              {formData.requerParametrizacao === true && (
                <p className="text-sm text-muted-foreground bg-accent/10 p-3 rounded-lg border">
                  <AlertCircle className="h-4 w-4 inline mr-2" />
                  Será aberta a etapa "Sistemas Fiscais" automaticamente após esta etapa.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="verificacaoTributaria">Verificação Tributária</Label>
              <Textarea
                id="verificacaoTributaria"
                value={formData.verificacaoTributaria || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, verificacaoTributaria: e.target.value }))}
                disabled={!canEdit}
                className={!canEdit ? "bg-muted" : ""}
                rows={3}
                placeholder="Detalhes da verificação tributária..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="regrasICMS">Regras de ICMS</Label>
              <Textarea
                id="regrasICMS"
                value={formData.regrasICMS || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, regrasICMS: e.target.value }))}
                disabled={!canEdit}
                className={!canEdit ? "bg-muted" : ""}
                rows={3}
                placeholder="Regras específicas de ICMS..."
              />
            </div>
          </div>
        );

      case "regulatory":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="checklistRegulatorio">Checklist Regulatório</Label>
              <Textarea
                id="checklistRegulatorio"
                value={formData.checklistRegulatorio || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, checklistRegulatorio: e.target.value }))}
                disabled={!canEdit}
                className={!canEdit ? "bg-muted" : ""}
                rows={4}
                placeholder="Itens do checklist regulatório..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacoesRegulatorio">Observações Regulatórias</Label>
              <Textarea
                id="observacoesRegulatorio"
                value={formData.observacoesRegulatorio || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, observacoesRegulatorio: e.target.value }))}
                disabled={!canEdit}
                className={!canEdit ? "bg-muted" : ""}
                rows={3}
                placeholder="Observações adicionais..."
              />
            </div>
          </div>
        );

      case "requester":
        return (
          <div className="space-y-6">
            <div className="bg-accent/10 p-4 rounded-lg border">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Informações Importantes
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Você pode visualizar todo o histórico anterior do processo</li>
                <li>• É possível salvar e continuar depois se necessário</li>
                {formData.temProposta === true && (
                  <li>• <strong>Atenção:</strong> Este processo possui proposta comercial anexa</li>
                )}
              </ul>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dadosSistemaExterno">Dados do Sistema Externo</Label>
              <Textarea
                id="dadosSistemaExterno"
                value={formData.dadosSistemaExterno || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, dadosSistemaExterno: e.target.value }))}
                disabled={!canEdit}
                className={!canEdit ? "bg-muted" : ""}
                rows={3}
                placeholder="Dados inseridos/atualizados no sistema externo..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dadosInclusaoData">Data e Hora de Inclusão</Label>
              <Input
                id="dadosInclusaoData"
                type="datetime-local"
                value={formData.dadosInclusaoData || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, dadosInclusaoData: e.target.value }))}
                disabled={!canEdit}
                className={!canEdit ? "bg-muted" : ""}
              />
            </div>
          </div>
        );

      case "finance":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="validadoMarcacaoCusto">Validado para marcação de custo</Label>
              <Select 
                value={formData.validadoMarcacaoCusto?.toString() || ""} 
                onValueChange={(value) => setFormData(prev => ({ 
                  ...prev, 
                  validadoMarcacaoCusto: value === "true" 
                }))}
                disabled={!canEdit}
              >
                <SelectTrigger className={!canEdit ? "bg-muted" : ""}>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Sim</SelectItem>
                  <SelectItem value="false">Não</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataEnvioMarcacao">Data de envio para marcação</Label>
              <Input
                id="dataEnvioMarcacao"
                type="date"
                value={formData.dataEnvioMarcacao || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, dataEnvioMarcacao: e.target.value }))}
                disabled={!canEdit}
                className={!canEdit ? "bg-muted" : ""}
              />
            </div>
          </div>
        );

      case "costs":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="custoMarcado">Custo marcado</Label>
              <Select 
                value={formData.custoMarcado?.toString() || ""} 
                onValueChange={(value) => setFormData(prev => ({ 
                  ...prev, 
                  custoMarcado: value === "true" 
                }))}
                disabled={!canEdit}
              >
                <SelectTrigger className={!canEdit ? "bg-muted" : ""}>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Sim</SelectItem>
                  <SelectItem value="false">Não</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataMarcacao">Data da marcação</Label>
              <Input
                id="dataMarcacao"
                type="date"
                value={formData.dataMarcacao || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, dataMarcacao: e.target.value }))}
                disabled={!canEdit}
                className={!canEdit ? "bg-muted" : ""}
              />
            </div>
          </div>
        );

      case "supply":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="dataMDGFinalizado">Data MDG Finalizado (A3)</Label>
              <Input
                id="dataMDGFinalizado"
                type="date"
                value={formData.dataMDGFinalizado || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, dataMDGFinalizado: e.target.value }))}
                disabled={!canEdit}
                className={!canEdit ? "bg-muted" : ""}
              />
            </div>

            {formData.tipoCadastro === "Peças" && (
              <div className="space-y-2">
                <Label htmlFor="reorderPointAtualizado">Reorder Point atualizado no ADDONE?</Label>
                <Select 
                  value={formData.reorderPointAtualizado?.toString() || ""} 
                  onValueChange={(value) => setFormData(prev => ({ 
                    ...prev, 
                    reorderPointAtualizado: value === "true" 
                  }))}
                  disabled={!canEdit}
                >
                  <SelectTrigger className={!canEdit ? "bg-muted" : ""}>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Sim</SelectItem>
                    <SelectItem value="false">Não</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        );

      case "taxSystems":
        return (
          <div className="space-y-6">
            <div className="bg-primary/10 p-4 rounded-lg border">
              <p className="text-sm text-primary font-medium">
                Esta etapa só é ativada quando o Fiscal marca "Requer parametrização = Sim"
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="parametrizacaoRealizada">Parametrização realizada</Label>
              <Select 
                value={formData.parametrizacaoRealizada?.toString() || ""} 
                onValueChange={(value) => setFormData(prev => ({ 
                  ...prev, 
                  parametrizacaoRealizada: value === "true" 
                }))}
                disabled={!canEdit}
              >
                <SelectTrigger className={!canEdit ? "bg-muted" : ""}>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Sim</SelectItem>
                  <SelectItem value="false">Não</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataParametrizacao">Data da parametrização</Label>
              <Input
                id="dataParametrizacao"
                type="date"
                value={formData.dataParametrizacao || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, dataParametrizacao: e.target.value }))}
                disabled={!canEdit}
                className={!canEdit ? "bg-muted" : ""}
              />
            </div>
          </div>
        );

      case "closure":
        return (
          <div className="space-y-6 text-center">
            <div className="bg-accent/10 p-6 rounded-lg border border-accent/20">
              <h3 className="text-xl font-semibold text-accent mb-2">
                Processo Pronto para Conclusão!
              </h3>
              <p className="text-muted-foreground">
                Todas as etapas foram concluídas. Clique em "Finalizar Processo" para concluir.
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Etapa não implementada</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 container mx-auto py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Dashboard
            </Button>
            <Badge variant="outline" className="text-xs">
              {formData.urgencia || "Médio"}
            </Badge>
          </div>

          {/* Process Info Card */}
          <Card>
            <CardHeader>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    {process.id}
                    {currentStep && (
                      <Badge variant="secondary" className="text-sm">
                        {currentStep.title}
                      </Badge>
                    )}
                  </CardTitle>
                  <p className="text-muted-foreground mt-1">
                    <span className="font-medium">Solicitante:</span> {formData.nomeSolicitante}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-medium">Objetivo:</span> {formData.objetivo || "Não informado"}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {currentStep && !process.closed && (
                    <AbbottSLAChip 
                      startedAt={process.stepsStart[process.currentStepId]?.startedAt}
                      slaHours={currentStep.slaHours}
                    />
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>Responsável: {currentStep?.responsible}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Permission Notice */}
          {!canEdit && !process.closed && (
            <Card className="border-warning/50 bg-warning/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-warning">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Esta etapa está sendo processada por: {currentStep?.responsible}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Você pode visualizar os dados, mas não pode editá-los.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Form Card */}
          <Card>
            <CardHeader>
              <CardTitle>
                {canEdit ? "Preencha os dados da sua etapa" : "Dados da Etapa"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderStepFields()}

              {canEdit && (
                <>
                  <Separator className="my-6" />
                  <div className="space-y-2">
                    <Label htmlFor="notes">Observações para a próxima etapa (opcional)</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={2}
                      placeholder="Adicione observações que podem ser úteis para o próximo responsável..."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button onClick={handleSave} variant="outline" className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Salvar e Continuar Depois
                    </Button>
                    <Button onClick={handleSend} className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      {process.currentStepId === "closure" ? "Finalizar Processo" : "Enviar ao Próximo"}
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* History Panel */}
      <HistoryPanel process={process} />
    </div>
  );
}