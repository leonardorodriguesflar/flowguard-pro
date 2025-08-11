import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider, 
  SidebarTrigger 
} from "@/components/ui/sidebar";
import { useAbbottProcess } from "@/context/AbbottProcessContext";
import { 
  Building2, 
  LayoutDashboard, 
  Plus, 
  CheckSquare, 
  History, 
  Zap, 
  Settings, 
  LogOut,
  User
} from "lucide-react";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { id: "new", label: "Nova Solicitação", icon: Plus, path: "/process/nova" },
  { id: "tasks", label: "Minhas Etapas", icon: CheckSquare, path: "/dashboard?tab=my-tasks" },
  { id: "history", label: "Histórico Completo", icon: History, path: "/dashboard?tab=completed" },
  { id: "scope", label: "Escopo & Automações", icon: Zap, path: "/scope" },
  { id: "settings", label: "Configurações", icon: Settings, path: "/settings" },
];

export default function AbbottLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentRole, clearSession } = useAbbottProcess();

  // Não mostrar sidebar na página de login
  if (location.pathname === "/login" || location.pathname === "/" || !currentRole) {
    return <>{children}</>;
  }

  const handleLogout = () => {
    clearSession();
    navigate("/login");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-bold text-sidebar-foreground">Abbott</h2>
                <p className="text-xs text-sidebar-foreground/70">Process Manager</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path || 
                  (item.id === "dashboard" && location.pathname.startsWith("/dashboard")) ||
                  (item.id === "tasks" && location.search.includes("my-tasks")) ||
                  (item.id === "history" && location.search.includes("completed"));
                
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      onClick={() => navigate(item.path)}
                      isActive={isActive}
                      className="w-full justify-start gap-3 py-3 px-4"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="border-t p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-sidebar-accent">
                <User className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {currentRole}
                </p>
                <p className="text-xs text-sidebar-foreground/70">
                  Usuário ativo
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="w-full justify-start gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sair do sistema
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="border-b bg-background p-4 flex items-center gap-4">
            <SidebarTrigger />
            <div className="flex-1" />
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Logado como:</span> {currentRole}
            </div>
          </header>
          
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}