import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Database, 
  MessageSquare, 
  FileText, 
  Bell, 
  Clock, 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle,
  Settings,
  Mail,
  Users
} from "lucide-react";

export default function ScopeAutomations() {
  const integrations = [
    {
      name: "Power Automate",
      description: "Fluxos automáticos de notificação e escalação",
      icon: <Zap className="h-5 w-5" />,
      status: "Planejado",
      features: [
        "Notificar próximo responsável ao envio",
        "Lembrar SLA próximo de vencer (75%)",
        "Escalonar SLA vencido para gerência",
        "Envio automático de resumo final"
      ]
    },
    {
      name: "Microsoft Dataverse",
      description: "Armazenamento seguro e auditoria completa",
      icon: <Database className="h-5 w-5" />,
      status: "Planejado", 
      features: [
        "Histórico imutável de todas as ações",
        "Backup automático dos dados",
        "Controle de versão por campo",
        "Relatórios de performance por etapa"
      ]
    },
    {
      name: "Microsoft Teams",
      description: "Interação rápida via Adaptive Cards",
      icon: <MessageSquare className="h-5 w-5" />,
      status: "Planejado",
      features: [
        "Cards interativos para aprovação rápida",
        "Notificações em tempo real",
        "Integração com calendários",
        "Histórico de conversas por processo"
      ]
    },
    {
      name: "Geração de PDF",
      description: "Relatórios finais automatizados",
      icon: <FileText className="h-5 w-5" />,
      status: "Disponível",
      features: [
        "Resumo consolidado de todo o processo",
        "Timeline visual das etapas",
        "Assinaturas digitais dos responsáveis",
        "Export para Excel/CSV"
      ]
    }
  ];

  const automationFlows = [
    {
      trigger: "Processo criado",
      actions: [
        "Registrar no Dataverse",
        "Iniciar SLA da primeira etapa",
        "Notificar Solicitante Primário"
      ],
      icon: <CheckCircle className="h-4 w-4 text-accent" />
    },
    {
      trigger: "Etapa enviada",
      actions: [
        "Salvar snapshot imutável",
        "Notificar próximo responsável",
        "Iniciar SLA da próxima etapa",
        "Atualizar dashboard em tempo real"
      ],
      icon: <ArrowRight className="h-4 w-4 text-primary" />
    },
    {
      trigger: "SLA próximo do vencimento",
      actions: [
        "Enviar lembrete ao responsável",
        "Notificar supervisor (opcional)",
        "Destacar no dashboard"
      ],
      icon: <Clock className="h-4 w-4 text-warning" />
    },
    {
      trigger: "SLA vencido",
      actions: [
        "Escalar para gerência",
        "Registrar no histórico de SLA",
        "Enviar relatório de atraso",
        "Marcar como crítico no dashboard"
      ],
      icon: <AlertTriangle className="h-4 w-4 text-destructive" />
    },
    {
      trigger: "Processo concluído",
      actions: [
        "Gerar PDF final automaticamente",
        "Notificar solicitante original",
        "Arquivar no Dataverse",
        "Atualizar métricas de performance"
      ],
      icon: <CheckCircle className="h-4 w-4 text-accent" />
    }
  ];

  const benefits = [
    "Redução de 80% no tempo de processamento manual",
    "Transparência total com histórico imutável", 
    "Cumprimento de SLA com alertas automáticos",
    "Redução de retrabalho e erros humanos",
    "Rastreabilidade completa end-to-end",
    "Integração nativa com ferramentas Microsoft"
  ];

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Escopo & Automações
        </h1>
        <p className="text-xl text-muted-foreground mb-2">
          Transformação digital do processo de cadastro Abbott
        </p>
        <p className="text-muted-foreground">
          Este protótipo demonstra a solução completa que será implementada 
          com Power Platform, eliminando planilhas e e-mails manuais.
        </p>
      </div>

      {/* Resumo do Projeto */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Resumo do Projeto
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Situação Atual</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Processo em Excel manual</li>
                <li>• Comunicação via e-mail</li>
                <li>• Falta de rastreabilidade</li>
                <li>• SLA não monitorado</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Solução Proposta</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Portal web centralizado</li>
                <li>• Fluxo digital automatizado</li>
                <li>• Histórico imutável</li>
                <li>• Notificações inteligentes</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Tecnologias</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Power Apps (Interface)</li>
                <li>• Power Automate (Fluxos)</li>
                <li>• Dataverse (Dados)</li>
                <li>• Teams (Colaboração)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integrações Planejadas */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          Integrações & Tecnologias
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {integrations.map((integration, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {integration.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{integration.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{integration.description}</p>
                    </div>
                  </div>
                  <Badge variant={integration.status === "Disponível" ? "default" : "secondary"}>
                    {integration.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {integration.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-accent flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Fluxos Automáticos */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Bell className="h-6 w-6 text-secondary" />
          Fluxos Automáticos Planejados
        </h2>
        <div className="space-y-4">
          {automationFlows.map((flow, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-secondary/10">
                    {flow.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{flow.trigger}</h3>
                    <div className="flex flex-wrap gap-2">
                      {flow.actions.map((action, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {action}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Benefícios */}
      <Card className="bg-gradient-to-r from-accent/5 to-primary/5 border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-accent" />
            Benefícios Esperados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="text-center">
        <CardContent className="p-8">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-xl font-semibold">Pronto para implementar?</h3>
            <p className="text-muted-foreground">
              Este protótipo demonstra todas as funcionalidades planejadas. 
              A implementação completa com Power Platform garantirá escalabilidade 
              e integração nativa com o ecossistema Microsoft da Abbott.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Solicitar Implementação
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Agendar Demonstração
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}