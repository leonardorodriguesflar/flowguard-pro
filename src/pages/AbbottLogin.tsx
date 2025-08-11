import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAbbottProcess } from "@/context/AbbottProcessContext";
import { toast } from "sonner";
import { Building2, LogIn } from "lucide-react";
import type { Role } from "@/context/AbbottProcessContext";

const roles: Role[] = [
  "Solicitante Primário",
  "Especialista de Serviços", 
  "Fiscal",
  "Regulatório",
  "Requisitante",
  "Finanças",
  "Custos",
  "Supply",
  "Sistemas Fiscais",
];

export default function AbbottLogin() {
  const navigate = useNavigate();
  const { setRole } = useAbbottProcess();
  const [selectedRole, setSelectedRole] = useState<Role | "">("");
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (!selectedRole || !username) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    setRole(selectedRole);
    toast.success(`Bem-vindo(a), ${username}!`);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-4 p-3 rounded-full bg-primary text-primary-foreground">
            <Building2 className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl font-bold">Abbott Process Manager</CardTitle>
          <p className="text-muted-foreground">Central de Cadastro & Rastreabilidade</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Nome de usuário</Label>
            <Input
              id="username"
              type="text"
              placeholder="Digite seu nome"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Função / Responsabilidade *</Label>
            <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as Role)}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Selecione sua função no processo" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleLogin} 
            className="w-full h-12 text-base font-semibold"
            disabled={!selectedRole || !username}
          >
            <LogIn className="h-4 w-4 mr-2" />
            Entrar no Sistema
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            <p>Protótipo funcional para demonstração</p>
            <Button variant="link" className="text-xs h-auto p-0 mt-1">
              Esqueci minha senha
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}