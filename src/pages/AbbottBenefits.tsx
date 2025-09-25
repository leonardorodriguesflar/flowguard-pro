import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, CheckCircle, Target, Zap, Shield, FileCheck, TrendingUp, Workflow } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const eficienciaData = [{
  area: "Solicitação",
  impacto: "Alto",
  valor: 90
}, {
  area: "Aprovação",
  impacto: "Muito Alto",
  valor: 95
}, {
  area: "Fiscal",
  impacto: "Alto",
  valor: 85
}, {
  area: "Regulatório",
  impacto: "Alto",
  valor: 80
}, {
  area: "Supply",
  impacto: "Muito Alto",
  valor: 92
}];
const beneficiosDistribuicao = [{
  nome: "Redução Tempo",
  valor: 35,
  cor: "hsl(var(--primary))"
}, {
  nome: "Eliminação Erros",
  valor: 25,
  cor: "hsl(var(--accent))"
}, {
  nome: "Automação",
  valor: 20,
  cor: "hsl(var(--success))"
}, {
  nome: "Rastreabilidade",
  valor: 20,
  cor: "hsl(var(--secondary))"
}];

const chartConfig = {
  impacto: {
    label: "Nível de Impacto",
    color: "hsl(var(--primary))"
  },
  valor: {
    label: "Impacto",
    color: "hsl(var(--primary))"
  }
};
export default function AbbottBenefits() {
  return <div className="space-y-8 p-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">Benefícios da Solução</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Principais benefícios esperados com a implementação do Abbott Process Manager
        </p>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-accent to-success text-accent-foreground">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Agilidade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Significativa</div>
            <p className="text-xs opacity-90">Redução no tempo de processo</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary to-primary text-secondary-foreground">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Qualidade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Excelente</div>
            <p className="text-xs opacity-90">Melhoria na precisão</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success to-accent text-accent-foreground">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Governança
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Completa</div>
            <p className="text-xs opacity-90">Controle e rastreabilidade</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Impacto */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Nível de Impacto por Área
            </CardTitle>
            <CardDescription>
              Impacto esperado da digitalização em cada etapa do processo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={eficienciaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="area" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="valor" fill="hsl(var(--primary))" name="Nível de Impacto" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Distribuição dos Benefícios
            </CardTitle>
            <CardDescription>
              Principais áreas de impacto da solução
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={beneficiosDistribuicao} cx="50%" cy="50%" outerRadius={80} dataKey="valor" label={({
                  nome,
                  valor
                }) => `${nome}: ${valor}%`}>
                    {beneficiosDistribuicao.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.cor} />)}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Benefícios Qualitativos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Benefícios Qualitativos
          </CardTitle>
          <CardDescription>
            Melhorias operacionais e estratégicas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-primary">Governança & Compliance</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                  Auditoria completa de todas as ações
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                  Rastreabilidade fim-a-fim
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                  Histórico imutável
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-primary">Qualidade & Eficiência</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                  Eliminação de retrabalho
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                  Validações automáticas
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                  Fluxo padronizado
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-primary">Experiência do Usuário</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                  Interface intuitiva e moderna
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                  Acesso móvel completo
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                  Notificações inteligentes
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progresso de Implementação */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Progresso da Implementação
          </CardTitle>
          <CardDescription>
            Fases do projeto e benefícios esperados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {[{
          fase: "Planejamento & Design",
          progresso: 100,
          beneficio: "Alinhamento de requisitos"
        }, {
          fase: "Desenvolvimento",
          progresso: 85,
          beneficio: "Primeiras automações ativas"
        }, {
          fase: "Testes & Ajustes",
          progresso: 60,
          beneficio: "Validação completa do fluxo"
        }, {
          fase: "Implantação",
          progresso: 30,
          beneficio: "Treinamento e go-live"
        }].map((item, index) => <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{item.fase}</span>
                <Badge variant={item.progresso === 100 ? "default" : "secondary"}>
                  {item.progresso}%
                </Badge>
              </div>
              <Progress value={item.progresso} className="h-2" />
              <p className="text-sm text-muted-foreground">{item.beneficio}</p>
            </div>)}
        </CardContent>
      </Card>
    </div>;
}