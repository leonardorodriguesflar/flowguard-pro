import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAbbottProcess } from "@/context/AbbottProcessContext";
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Mail, 
  Calendar,
  Zap,
  FileText,
  LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function AbbottSettings() {
  const { currentRole, clearSession } = useAbbottProcess();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [teamsNotifications, setTeamsNotifications] = useState(true);
  const [slaAlerts, setSlaAlerts] = useState(true);

  const handleLogout = () => {
    clearSession();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    navigate("/abbott/login");
  };

  const handleSaveSettings = () => {
    toast({
      title: "Configurações salvas",
      description: "Suas preferências foram atualizadas com sucesso.",
    });
  };

  const features = [
    {
      icon: <Mail className="h-5 w-5" />,
      name: "Notificações por E-mail",
      description: "Alertas automáticos quando processos chegam na sua etapa",
      available: true
    },
    {
      icon: <Zap className="h-5 w-5" />,
      name: "Integração Teams",
      description: "Adaptive Cards para aprovação rápida diretamente no Teams",
      available: true
    },
    {
      icon: <Database className="h-5 w-5" />,
      name: "Backup Dataverse",
      description: "Armazenamento seguro e auditoria completa de todos os dados",
      available: true
    },
    {
      icon: <FileText className="h-5 w-5" />,
      name: "Relatórios Automáticos",
      description: "Geração de PDFs e relatórios de performance por etapa",
      available: true
    }
  ];

  const permissions = [
    "Visualizar processos da própria etapa",
    "Editar campos da etapa atual",
    "Visualizar histórico completo",
    "Salvar rascunhos",
    "Enviar para próxima etapa",
    "Exportar dados do processo"
  ];

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie suas preferências e configurações do sistema
          </p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Sair
        </Button>
      </div>

      {/* User Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Perfil do Usuário
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Função Atual</h3>
              <p className="text-sm text-muted-foreground">
                {currentRole || "Nenhuma função selecionada"}
              </p>
            </div>
            <Badge variant="outline" className="px-3 py-1">
              <Shield className="h-4 w-4 mr-2" />
              {currentRole || "Visitante"}
            </Badge>
          </div>
          <Separator />
          <div>
            <h3 className="font-medium mb-2">Permissões</h3>
            <div className="grid md:grid-cols-2 gap-2">
              {permissions.map((permission, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {permission}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notificações
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications" className="font-medium">
                E-mail
              </Label>
              <p className="text-sm text-muted-foreground">
                Receber notificações por e-mail quando um processo chegar na sua etapa
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="teams-notifications" className="font-medium">
                Microsoft Teams
              </Label>
              <p className="text-sm text-muted-foreground">
                Receber Adaptive Cards no Teams para ação rápida
              </p>
            </div>
            <Switch
              id="teams-notifications"
              checked={teamsNotifications}
              onCheckedChange={setTeamsNotifications}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sla-alerts" className="font-medium">
                Alertas de SLA
              </Label>
              <p className="text-sm text-muted-foreground">
                Ser notificado quando SLA estiver próximo do vencimento
              </p>
            </div>
            <Switch
              id="sla-alerts"
              checked={slaAlerts}
              onCheckedChange={setSlaAlerts}
            />
          </div>
        </CardContent>
      </Card>

      {/* Features Available */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Recursos Disponíveis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{feature.name}</h3>
                    <Badge variant={feature.available ? "default" : "secondary"} className="text-xs">
                      {feature.available ? "Disponível" : "Em breve"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Informações do Sistema
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-1">Versão do Protótipo</h4>
              <p className="text-sm text-muted-foreground">v1.0.0</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Última Atualização</h4>
              <p className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString()}
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Tecnologia</h4>
              <p className="text-sm text-muted-foreground">Power Platform Ready</p>
            </div>
          </div>
          <Separator />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            Este protótipo demonstra a funcionalidade completa que será implementada com Power Apps, Power Automate e Dataverse.
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
}