import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  Users,
  Target,
  DollarSign,
  Cog,
  Smartphone
} from "lucide-react";

export default function ScopeAutomations() {
  return (
    <div className="space-y-8 p-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-abbott-blue">Proposta Comercial</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Solução completa para transformação digital do processo de cadastro
        </p>
      </div>

      {/* Proposta Comercial */}
      <Card className="bg-gradient-to-br from-abbott-blue to-abbott-secondary text-white">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Abbott Process Manager</CardTitle>
          <CardDescription className="text-center text-blue-100">
            Central de Cadastro & Rastreabilidade - Proposta LIT Tecnologia
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="bg-white/10 rounded-lg p-6">
            <div className="text-4xl font-bold mb-2">R$ 53.000</div>
            <div className="text-lg opacity-90">Investimento Total</div>
            <div className="text-sm opacity-80 mt-2">Escopo fechado | Entrega em 4 fases</div>
          </div>
        </CardContent>
      </Card>

      {/* Resumo Executivo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-abbott-blue" />
            Resumo Executivo
          </CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <p className="text-lg mb-4">
            A <strong>LIT Tecnologia</strong> apresenta solução completa para modernizar o processo de cadastro 
            da Abbott, transformando planilhas Excel em uma plataforma digital robusta com Microsoft Power Apps.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-abbott-blue mb-2">Situação Atual</h4>
              <ul className="text-sm space-y-1">
                <li>• Gestão manual via Excel</li>
                <li>• Falta de rastreabilidade</li>
                <li>• Comunicação descoordenada</li>
                <li>• Complexidade das condicionais</li>
                <li>• Ausência de automação</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-abbott-accent mb-2">Solução Proposta</h4>
              <ul className="text-sm space-y-1">
                <li>• Aplicativo Power Apps personalizado</li>
                <li>• Fluxos automatizados</li>
                <li>• Histórico completo e auditável</li>
                <li>• Notificações inteligentes</li>
                <li>• Interface intuitiva</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Escopo Detalhado */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-abbott-blue" />
            Escopo do Projeto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-abbott-blue">Fase 1: Planejamento & Design</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-abbott-accent mt-0.5 flex-shrink-0" />
                  Levantamento detalhado de requisitos
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-abbott-accent mt-0.5 flex-shrink-0" />
                  Design UX/UI personalizado
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-abbott-accent mt-0.5 flex-shrink-0" />
                  Modelagem de dados
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-abbott-accent mt-0.5 flex-shrink-0" />
                  Arquitetura técnica
                </li>
              </ul>

              <h4 className="font-semibold text-abbott-blue pt-4">Fase 2: Desenvolvimento</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-abbott-accent mt-0.5 flex-shrink-0" />
                  Aplicativo Power Apps completo
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-abbott-accent mt-0.5 flex-shrink-0" />
                  Fluxos Power Automate
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-abbott-accent mt-0.5 flex-shrink-0" />
                  Base de dados Dataverse
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-abbott-accent mt-0.5 flex-shrink-0" />
                  Sistema de rastreabilidade
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-abbott-blue">Fase 3: Testes & Ajustes</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-abbott-accent mt-0.5 flex-shrink-0" />
                  Testes funcionais completos
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-abbott-accent mt-0.5 flex-shrink-0" />
                  Testes de usabilidade
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-abbott-accent mt-0.5 flex-shrink-0" />
                  Testes de performance
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-abbott-accent mt-0.5 flex-shrink-0" />
                  Correções e melhorias
                </li>
              </ul>

              <h4 className="font-semibold text-abbott-blue pt-4">Fase 4: Implantação</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-abbott-accent mt-0.5 flex-shrink-0" />
                  Deploy em produção
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-abbott-accent mt-0.5 flex-shrink-0" />
                  Treinamento de usuários
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-abbott-accent mt-0.5 flex-shrink-0" />
                  Documentação completa
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-abbott-accent mt-0.5 flex-shrink-0" />
                  Suporte pós-implantação
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tecnologias e Integrações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cog className="h-5 w-5 text-abbott-blue" />
            Tecnologias Utilizadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Power Apps", description: "Interface principal", icon: <Smartphone />, status: "Incluído" },
              { name: "Power Automate", description: "Automação de fluxos", icon: <Zap />, status: "Incluído" },
              { name: "Dataverse", description: "Base de dados", icon: <Database />, status: "Incluído" },
              { name: "Teams Integration", description: "Notificações", icon: <MessageSquare />, status: "Incluído" },
            ].map((tech, index) => (
              <div key={index} className="text-center p-4 border rounded-lg hover:bg-blue-50 transition-colors">
                <div className="text-abbott-blue mb-2 flex justify-center">{tech.icon}</div>
                <h4 className="font-semibold text-sm">{tech.name}</h4>
                <p className="text-xs text-muted-foreground mb-2">{tech.description}</p>
                <Badge variant="default" className="text-xs">{tech.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Investimento Detalhado */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-abbott-blue" />
            Detalhamento do Investimento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-abbott-blue">R$ 53.000</div>
                  <div className="text-sm text-muted-foreground">Investimento Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-abbott-accent">4 Fases</div>
                  <div className="text-sm text-muted-foreground">Entrega Progressiva</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">3-4 Meses</div>
                  <div className="text-sm text-muted-foreground">Prazo de Entrega</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-abbott-blue mb-3">Modelo de Cobrança</h4>
                <ul className="space-y-2 text-sm">
                  <li>✅ Escopo fechado e bem definido</li>
                  <li>✅ Sem surpresas no orçamento</li>
                  <li>✅ Pagamento por milestone</li>
                  <li>✅ Garantia de entrega</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-abbott-blue mb-3">Não Incluso</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Licenças Microsoft Power Platform</li>
                  <li>• Integrações complexas com sistemas legados</li>
                  <li>• Customizações além do escopo definido</li>
                  <li>• Treinamentos adicionais</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Benefícios Esperados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-abbott-blue" />
            Benefícios Esperados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-abbott-blue">Operacionais</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-abbott-accent mt-0.5 flex-shrink-0" />
                  Redução de 75% no tempo de processamento
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-abbott-accent mt-0.5 flex-shrink-0" />
                  Eliminação de erros manuais
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-abbott-accent mt-0.5 flex-shrink-0" />
                  Rastreabilidade completa
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-abbott-accent mt-0.5 flex-shrink-0" />
                  Cumprimento automático de SLAs
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-abbott-blue">Estratégicos</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-abbott-accent mt-0.5 flex-shrink-0" />
                  Compliance e auditoria automatizada
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-abbott-accent mt-0.5 flex-shrink-0" />
                  Dashboards gerenciais em tempo real
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-abbott-accent mt-0.5 flex-shrink-0" />
                  Integração nativa com Microsoft 365
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-abbott-accent mt-0.5 flex-shrink-0" />
                  Escalabilidade para outros processos
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Próximos Passos */}
      <Card className="bg-gradient-to-r from-abbott-blue/5 to-abbott-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRight className="h-5 w-5 text-abbott-blue" />
            Próximos Passos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-abbott-blue">Para Aprovação</h4>
              <ol className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="bg-abbott-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                  Revisão e validação da proposta
                </li>
                <li className="flex gap-2">
                  <span className="bg-abbott-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                  Reunião de alinhamento técnico
                </li>
                <li className="flex gap-2">
                  <span className="bg-abbott-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                  Assinatura do contrato
                </li>
                <li className="flex gap-2">
                  <span className="bg-abbott-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                  Kick-off do projeto
                </li>
              </ol>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-abbott-blue">Contatos</h4>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-white rounded-lg border">
                  <div className="font-medium">LIT Tecnologia</div>
                  <div className="text-muted-foreground">Equipe de Vendas</div>
                  <div className="text-abbott-blue">vendas@littec.com</div>
                </div>
                <div className="p-3 bg-white rounded-lg border">
                  <div className="font-medium">Suporte Técnico</div>
                  <div className="text-muted-foreground">Arquitetos de Solução</div>
                  <div className="text-abbott-blue">suporte@littec.com</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

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