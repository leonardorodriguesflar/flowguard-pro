import { createContext, useContext, useMemo, useState, useEffect } from "react";

export type StepId =
  | "primary"
  | "services"
  | "fiscal"
  | "regulatory"
  | "requester"
  | "finance"
  | "costs"
  | "supply"
  | "taxSystems"
  | "closure";

export type Role =
  | "Solicitante Primário"
  | "Especialista de Serviços"
  | "Fiscal"
  | "Regulatório"
  | "Requisitante"
  | "Finanças"
  | "Custos"
  | "Supply"
  | "Sistemas Fiscais";

export interface StepDef {
  id: StepId;
  title: string;
  responsible: Role;
  slaHours: number | "TBC";
  isActive: (data: Record<string, any>) => boolean;
}

export interface HistoryEntry {
  stepId: StepId;
  responsible: Role;
  when: number;
  action: "saved" | "sent";
  dataSnapshot: Record<string, any>;
  notes?: string;
}

export interface Process {
  id: string;
  createdAt: number;
  data: Record<string, any>;
  currentStepId: StepId;
  history: HistoryEntry[];
  stepsStart: Record<StepId, { startedAt: number; slaHours: number | "TBC" } | undefined>;
  closed: boolean;
}

const defaultData: Record<string, any> = {
  nomeSolicitante: "",
  dataAbertura: new Date().toISOString(),
  objetivo: "",
  descricao: "",
  itemNacional: undefined as boolean | undefined,
  temProposta: undefined as boolean | undefined,
  propostaAnexo: [] as string[],
  urgencia: "Média",
  requerParametrizacao: undefined as boolean | undefined,
  parametrizacaoRealizada: "",
};

export const STEPS: StepDef[] = [
  {
    id: "primary",
    title: "Solicitante Primário",
    responsible: "Solicitante Primário",
    slaHours: 24,
    isActive: () => true,
  },
  {
    id: "services",
    title: "Especialista de Serviços",
    responsible: "Especialista de Serviços",
    slaHours: 24,
    isActive: (d) => d.itemNacional === true,
  },
  {
    id: "fiscal",
    title: "Fiscal",
    responsible: "Fiscal",
    slaHours: 24,
    isActive: () => true,
  },
  {
    id: "regulatory",
    title: "Regulatório",
    responsible: "Regulatório",
    slaHours: 24,
    isActive: () => true,
  },
  {
    id: "requester",
    title: "Requisitante",
    responsible: "Requisitante",
    slaHours: 48,
    isActive: () => true,
  },
  {
    id: "finance",
    title: "Finanças",
    responsible: "Finanças",
    slaHours: 24,
    isActive: () => true,
  },
  {
    id: "costs",
    title: "Custos",
    responsible: "Custos",
    slaHours: 24,
    isActive: () => true,
  },
  {
    id: "supply",
    title: "Supply",
    responsible: "Supply",
    slaHours: 24,
    isActive: () => true,
  },
  {
    id: "taxSystems",
    title: "Sistemas Fiscais",
    responsible: "Sistemas Fiscais",
    slaHours: "TBC",
    isActive: () => true,
  },
  {
    id: "closure",
    title: "Retorno ao Solicitante Primário",
    responsible: "Solicitante Primário",
    slaHours: 4,
    isActive: () => true,
  },
];

function getActiveStepIds(data: Record<string, any>): StepId[] {
  return STEPS.filter((s) => s.isActive(data)).map((s) => s.id);
}

function getNextStepId(current: StepId, data: Record<string, any>): StepId | undefined {
  const active = getActiveStepIds(data);
  const idx = active.indexOf(current);
  return idx >= 0 ? active[idx + 1] : undefined;
}

interface Ctx {
  processes: Process[];
  currentRole: Role | null;
  setRole: (r: Role) => void;
  clearSession: () => void;
  createProcess: () => Process;
  getProcess: (id: string) => Process | undefined;
  saveDraft: (id: string, partial: Record<string, any>) => void;
  sendToNext: (id: string, notes?: string) => void;
}

const ProcessContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "portal-processos-state-v1";

export function ProcessProvider({ children }: { children: React.ReactNode }) {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setProcesses(parsed.processes || []);
        setCurrentRole(parsed.currentRole || null);
      }
    } catch { }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ processes, currentRole })
    );
  }, [processes, currentRole]);

  const api = useMemo<Ctx>(() => ({
    processes,
    currentRole,
    setRole: (r) => setCurrentRole(r),
    clearSession: () => {
      setCurrentRole(null);
      // keep processes to simulate persistent system
    },
    createProcess: () => {
      const id = `PRC-${Date.now().toString().slice(-6)}`;
      const first = STEPS[0];
      const p: Process = {
        id,
        createdAt: Date.now(),
        data: { ...defaultData },
        currentStepId: first.id,
        history: [],
        stepsStart: {
          primary: { startedAt: Date.now(), slaHours: first.slaHours },
          services: undefined,
          fiscal: undefined,
          regulatory: undefined,
          requester: undefined,
          finance: undefined,
          costs: undefined,
          supply: undefined,
          taxSystems: undefined,
          closure: undefined,
        },
        closed: false,
      };
      setProcesses((prev) => [p, ...prev]);
      return p;
    },
    getProcess: (id) => processes.find((p) => p.id === id),
    saveDraft: (id, partial) => {
      setProcesses((prev) =>
        prev.map((p) => {
          if (p.id !== id) return p;
          const data = { ...p.data, ...partial };
          const entry: HistoryEntry = {
            stepId: p.currentStepId,
            responsible: STEPS.find((s) => s.id === p.currentStepId)!.responsible,
            when: Date.now(),
            action: "saved",
            dataSnapshot: data,
          };
          return { ...p, data, history: [entry, ...p.history] };
        })
      );
    },
    sendToNext: (id, notes) => {
      setProcesses((prev) =>
        prev.map((p) => {
          if (p.id !== id) return p;
          const currentDef = STEPS.find((s) => s.id === p.currentStepId)!;
          const entry: HistoryEntry = {
            stepId: p.currentStepId,
            responsible: currentDef.responsible,
            when: Date.now(),
            action: "sent",
            dataSnapshot: p.data,
            notes,
          };
          const next = getNextStepId(p.currentStepId, p.data);
          if (!next) {
            // go to closure or close if already there
            if (p.currentStepId !== "closure") {
              return {
                ...p,
                history: [entry, ...p.history],
                currentStepId: "closure",
                stepsStart: {
                  ...p.stepsStart,
                  closure: { startedAt: Date.now(), slaHours: STEPS.find(s => s.id === 'closure')!.slaHours },
                },
              };
            }
            return { ...p, history: [entry, ...p.history], closed: true };
          }
          const nextDef = STEPS.find((s) => s.id === next)!;
          return {
            ...p,
            history: [entry, ...p.history],
            currentStepId: next,
            stepsStart: {
              ...p.stepsStart,
              [next]: { startedAt: Date.now(), slaHours: nextDef.slaHours },
            },
          };
        })
      );
    },
  }), [processes, currentRole]);

  return <ProcessContext.Provider value={api}>{children}</ProcessContext.Provider>;
}

export function useProcess() {
  const ctx = useContext(ProcessContext);
  if (!ctx) throw new Error("useProcess must be used within ProcessProvider");
  return ctx;
}
