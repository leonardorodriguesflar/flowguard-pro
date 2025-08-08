import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useProcess } from "@/context/ProcessContext";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { currentRole, clearSession } = useProcess();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Minimal SEO: update title per route
    const map: Record<string, string> = {
      "/": "Portal de Processos — Início",
      "/login": "Portal de Processos — Login",
      "/dashboard": "Portal de Processos — Dashboard",
    };
    const title = Object.entries(map).find(([path]) => location.pathname.startsWith(path))?.[1] || "Portal de Processos";
    document.title = title.slice(0, 60);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md" style={{ background: "var(--gradient-primary)" }} />
            <span className="font-semibold">Portal de Processos</span>
          </Link>

          <nav className="flex items-center gap-2">
            <Link to="/dashboard" className="px-3 py-2 rounded-md hover:bg-accent transition-colors">Dashboard</Link>
            <Button variant="secondary" onClick={() => navigate("/process/nova")}>Nova Solicitação</Button>
            {currentRole ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Perfil:</span>
                <span className="px-2 py-1 rounded bg-secondary text-sm">{currentRole}</span>
                <Button variant="outline" onClick={clearSession}>Sair</Button>
              </div>
            ) : (
              <Button asChild>
                <Link to="/login">Entrar</Link>
              </Button>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>
      <footer className="border-t">
        <div className="container mx-auto py-6 text-sm text-muted-foreground flex items-center justify-between">
          <p>&copy; {new Date().getFullYear()} Portal de Processos</p>
          <p>Identidade: Cinza, Verde e Preto</p>
        </div>
      </footer>
    </div>
  );
}
