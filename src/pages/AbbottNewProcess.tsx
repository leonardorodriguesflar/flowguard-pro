import { useNavigate } from "react-router-dom";
import { useAbbottProcess } from "@/context/AbbottProcessContext";
import { toast } from "sonner";
import { useEffect } from "react";

export default function AbbottNewProcess() {
  const navigate = useNavigate();
  const { createProcess, currentRole } = useAbbottProcess();

  useEffect(() => {
    if (!currentRole) {
      navigate("/login");
      return;
    }

    if (currentRole !== "Solicitante Primário") {
      toast.error("Apenas o Solicitante Primário pode criar novos processos");
      navigate("/dashboard");
      return;
    }

    const newProcess = createProcess();
    toast.success(`Novo processo criado: ${newProcess.id}`);
    navigate(`/process/${newProcess.id}`);
  }, [createProcess, navigate, currentRole]);

  return (
    <div className="container mx-auto py-12 text-center">
      <div className="animate-pulse">
        <h1 className="text-2xl font-bold mb-4">Criando novo processo...</h1>
        <p className="text-muted-foreground">Redirecionando para o formulário...</p>
      </div>
    </div>
  );
}