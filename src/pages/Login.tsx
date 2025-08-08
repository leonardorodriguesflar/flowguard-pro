import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProcess, STEPS, type Role } from "@/context/ProcessContext";

export default function Login() {
  const { setRole } = useProcess();
  const navigate = useNavigate();
  const roles = useMemo(() => Array.from(new Set(STEPS.map((s) => s.responsible))) as Role[], []);
  const [selected, setSelected] = useState<Role | "">(roles[0] || "");
  const [email, setEmail] = useState("");

  useEffect(() => {
    document.title = "Portal de Processos — Login";
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) return;
    setRole(selected as Role);
    navigate("/dashboard");
  }

  return (
    <div className="container mx-auto max-w-xl py-16">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Acesso Corporativo</h1>
        <p className="text-muted-foreground">Selecione seu perfil para continuar.</p>
      </header>
      <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border p-6 bg-card">
        <div className="grid gap-2">
          <Label htmlFor="email">E-mail corporativo</Label>
          <Input id="email" type="email" placeholder="voce@empresa.com" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="role">Perfil</Label>
          <select id="role" className="h-10 rounded-md border bg-background px-3" value={selected} onChange={(e)=>setSelected(e.target.value as Role)}>
            {roles.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-3">
          <Button type="submit">Entrar (SSO mock)</Button>
          <Button type="button" variant="outline" onClick={()=>navigate("/")}>Voltar</Button>
        </div>
        <p className="text-xs text-muted-foreground">Esqueci minha senha (SSO gerenciado pela corporação).</p>
      </form>
    </div>
  );
}
