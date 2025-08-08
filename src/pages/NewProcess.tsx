import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProcess } from "@/context/ProcessContext";

export default function NewProcess() {
  const { createProcess } = useProcess();
  const navigate = useNavigate();

  useEffect(() => {
    const p = createProcess();
    navigate(`/process/${p.id}`, { replace: true });
  }, [createProcess, navigate]);

  return <div className="container mx-auto py-10">Preparando nova solicitação…</div>;
}
