import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AbbottLogin from "./pages/AbbottLogin";
import AbbottDashboard from "./pages/AbbottDashboard";
import AbbottProcessForm from "./pages/AbbottProcessForm";
import AbbottMyTasks from "./pages/AbbottMyTasks";
import AbbottHistory from "./pages/AbbottHistory";
import AbbottSettings from "./pages/AbbottSettings";
import Summary from "./pages/Summary";
import ScopeAutomations from "./pages/ScopeAutomations";
import AbbottLayout from "./layouts/AbbottLayout";
import { AbbottProcessProvider } from "./context/AbbottProcessContext";
import AbbottNewProcess from "./pages/AbbottNewProcess";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AbbottProcessProvider>
        <BrowserRouter>
          <AbbottLayout>
            <Routes>
              <Route path="/" element={<AbbottLogin />} />
              <Route path="/login" element={<AbbottLogin />} />
              <Route path="/dashboard" element={<AbbottDashboard />} />
              <Route path="/my-tasks" element={<AbbottMyTasks />} />
              <Route path="/history" element={<AbbottHistory />} />
              <Route path="/settings" element={<AbbottSettings />} />
              <Route path="/scope" element={<ScopeAutomations />} />
              <Route path="/process/nova" element={<AbbottNewProcess />} />
              <Route path="/process/:id" element={<AbbottProcessForm />} />
              <Route path="/summary/:id" element={<Summary />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AbbottLayout>
        </BrowserRouter>
      </AbbottProcessProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
