import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center bg-gradient-to-b from-background to-card">
      <div className="container mx-auto grid lg:grid-cols-2 gap-10 items-center py-20">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">Central de Aprovações com Rastreamento, SLAs e Histórico</h1>
          <p className="text-lg text-muted-foreground">Substitua planilhas e e-mails por um fluxo centralizado, com notificações, campos condicionais e exportação de resumo.</p>
          <div className="flex items-center gap-3">
            <Button asChild>
              <Link to="/login">Entrar</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link to="/dashboard">Ver Dashboard</Link>
            </Button>
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="relative rounded-xl border bg-card p-8 shadow-[var(--shadow-elevated)]">
            <div className="absolute -inset-0.5 rounded-xl opacity-30" style={{ background: "var(--gradient-primary)" }} />
            <div className="relative space-y-3">
              <div className="h-3 w-1/2 rounded bg-secondary" />
              <div className="h-3 w-4/5 rounded bg-secondary" />
              <div className="h-3 w-2/3 rounded bg-secondary" />
              <div className="grid grid-cols-3 gap-2 pt-4">
                <div className="h-20 rounded bg-secondary" />
                <div className="h-20 rounded bg-secondary" />
                <div className="h-20 rounded bg-secondary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
