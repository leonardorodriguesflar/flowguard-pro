import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, Users, CheckCircle, DollarSign, Target, Zap, Shield } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const roiData = [
  { mes: "Mês 1", economia: 5000, investimento: 53000 },
  { mes: "Mês 2", economia: 12000, investimento: 53000 },
  { mes: "Mês 3", economia: 18000, investimento: 53000 },
  { mes: "Mês 6", economia: 35000, investimento: 53000 },
  { mes: "Mês 12", economia: 65000, investimento: 53000 },
];

const eficienciaData = [
  { area: "Solicitação", antes: 120, depois: 15 },
  { area: "Aprovação", antes: 240, depois: 30 },
  { area: "Fiscal", antes: 180, depois: 45 },
  { area: "Regulatório", antes: 200, depois: 60 },
  { area: "Supply", antes: 150, depois: 20 },
];

const beneficiosDistribuicao = [
  { nome: "Redução Tempo", valor: 35, cor: "#004C97" },
  { nome: "Eliminação Erros", valor: 25, cor: "#00A3E0" },
  { nome: "Automação", valor: 20, cor: "#1BB55C" },
  { nome: "Rastreabilidade", valor: 20, cor: "#16A34A" },
];

const chartConfig = {
  economia: { label: "Economia", color: "#1BB55C" },
  investimento: { label: "Investimento", color: "#004C97" },
  antes: { label: "Processo Atual", color: "#DC2626" },
  depois: { label: "Processo Digital", color: "#1BB55C" },
};

export default function AbbottBenefits() {
  return (
    <div className="space-y-8 p-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-abbott-blue">Benefícios & ROI</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Análise completa dos benefícios esperados com a implementação do Abbott Process Manager
        </p>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-abbott-blue to-abbott-secondary text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Economia Anual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 65.000</div>
            <p className="text-xs opacity-90">23% redução nos custos</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-abbott-accent to-green-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Tempo Poupado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <p className="text-xs opacity-90">Redução no tempo total</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-abbott-secondary text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4" />
              ROI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">123%</div>
            <p className="text-xs opacity-90">Retorno em 12 meses</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-abbott-accent text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Precisão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.5%</div>
            <p className="text-xs opacity-90">Redução de erros</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico ROI */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-abbott-blue" />
            Retorno sobre Investimento (ROI)
          </CardTitle>
          <CardDescription>
            Projeção de economia ao longo do primeiro ano
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={roiData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="economia" 
                  stroke="#1BB55C" 
                  strokeWidth={3}
                  dot={{ fill: "#1BB55C", strokeWidth: 2, r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="investimento" 
                  stroke="#004C97" 
                  strokeDasharray="5 5"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="mt-4 flex justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-abbott-accent rounded-full"></div>
              <span className="text-sm">Economia Acumulada</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-abbott-blue rounded-full border-2 border-dashed"></div>
              <span className="text-sm">Investimento Inicial</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de Eficiência */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-abbott-blue" />
              Redução de Tempo por Etapa
            </CardTitle>
            <CardDescription>
              Comparação entre processo atual e digitalizado (em minutos)
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
                  <Bar dataKey="antes" fill="#DC2626" name="Processo Atual" />
                  <Bar dataKey="depois" fill="#1BB55C" name="Processo Digital" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-abbott-blue" />
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
                  <Pie
                    data={beneficiosDistribuicao}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="valor"
                    label={({ nome, valor }) => `${nome}: ${valor}%`}
                  >
                    {beneficiosDistribuicao.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.cor} />
                    ))}
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
            <Shield className="h-5 w-5 text-abbott-blue" />
            Benefícios Qualitativos
          </CardTitle>
          <CardDescription>
            Melhorias operacionais e estratégicas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-abbott-blue">Governança & Compliance</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-abbott-accent mt-0.5 flex-shrink-0" />
                  Auditoria completa de todas as ações
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-abbott-accent mt-0.5 flex-shrink-0" />
                  Rastreabilidade fim-a-fim
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-abbott-accent mt-0.5 flex-shrink-0" />
                  Histórico imutável
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-abbott-blue">Qualidade & Eficiência</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-abbott-accent mt-0.5 flex-shrink-0" />
                  Eliminação de retrabalho
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-abbott-accent mt-0.5 flex-shrink-0" />
                  Validações automáticas
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-abbott-accent mt-0.5 flex-shrink-0" />
                  Fluxo padronizado
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-abbott-blue">Experiência do Usuário</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-abbott-accent mt-0.5 flex-shrink-0" />
                  Interface intuitiva e moderna
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-abbott-accent mt-0.5 flex-shrink-0" />
                  Acesso móvel completo
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-abbott-accent mt-0.5 flex-shrink-0" />
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
            <Users className="h-5 w-5 text-abbott-blue" />
            Progresso da Implementação
          </CardTitle>
          <CardDescription>
            Fases do projeto e benefícios esperados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {[
            { fase: "Planejamento & Design", progresso: 100, beneficio: "Alinhamento de requisitos" },
            { fase: "Desenvolvimento", progresso: 85, beneficio: "Primeiras automações ativas" },
            { fase: "Testes & Ajustes", progresso: 60, beneficio: "Validação completa do fluxo" },
            { fase: "Implantação", progresso: 30, beneficio: "Treinamento e go-live" },
          ].map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{item.fase}</span>
                <Badge variant={item.progresso === 100 ? "default" : "secondary"}>
                  {item.progresso}%
                </Badge>
              </div>
              <Progress value={item.progresso} className="h-2" />
              <p className="text-sm text-muted-foreground">{item.beneficio}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}