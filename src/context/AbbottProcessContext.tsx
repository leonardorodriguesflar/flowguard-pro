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

export interface AbbottProcess {
  id: string;
  createdAt: number;
  data: Record<string, any>;
  currentStepId: StepId;
  history: HistoryEntry[];
  stepsStart: Record<StepId, { startedAt: number; slaHours: number | "TBC" } | undefined>;
  closed: boolean;
}

const defaultData: Record<string, any> = {
  // Solicitante Primário
  nomeSolicitante: "",
  dataAbertura: new Date().toISOString(),
  objetivo: "",
  descricao: "",
  itemNacional: undefined as boolean | undefined,
  temProposta: undefined as boolean | undefined,
  urgencia: "Médio", // Urgente | Médio | Baixo
  
  // Especialista de Serviços
  tipoCadastro: "", // "Peças" | "Outros"
  temperaturaMDG: "",
  ncmCode: "",
  
  // Fiscal
  requerParametrizacao: undefined as boolean | undefined,
  verificacaoTributaria: "",
  regrasICMS: "",
  
  // Regulatório
  checklistRegulatorio: "",
  observacoesRegulatorio: "",
  
  // Requisitante
  dadosSistemaExterno: "",
  dadosInclusaoData: "",
  
  // Finanças
  validadoMarcacaoCusto: undefined as boolean | undefined,
  dataEnvioMarcacao: "",
  
  // Custos
  custoMarcado: undefined as boolean | undefined,
  dataMarcacao: "",
  
  // Supply
  dataMDGFinalizado: "",
  reorderPointAtualizado: undefined as boolean | undefined,
  
  // Sistemas Fiscais
  parametrizacaoRealizada: undefined as boolean | undefined,
  dataParametrizacao: "",
};

export const ABBOTT_STEPS: StepDef[] = [
  {
    id: "primary",
    title: "Solicitante Primário",
    responsible: "Solicitante Primário",
    slaHours: 0, // Inicial
    isActive: () => true,
  },
  {
    id: "services",
    title: "Especialista de Serviços",
    responsible: "Especialista de Serviços",
    slaHours: 48, // 2 dias
    isActive: (d) => d.itemNacional === true,
  },
  {
    id: "fiscal",
    title: "Fiscal",
    responsible: "Fiscal",
    slaHours: 48, // 2 dias
    isActive: () => true,
  },
  {
    id: "regulatory",
    title: "Regulatório",
    responsible: "Regulatório",
    slaHours: 48, // 2 dias
    isActive: () => true,
  },
  {
    id: "requester",
    title: "Requisitante",
    responsible: "Requisitante",
    slaHours: 48, // 2 dias
    isActive: () => true,
  },
  {
    id: "finance",
    title: "Finanças",
    responsible: "Finanças",
    slaHours: 72, // 3 dias
    isActive: () => true,
  },
  {
    id: "costs",
    title: "Custos",
    responsible: "Custos",
    slaHours: 24, // 1 dia
    isActive: () => true,
  },
  {
    id: "supply",
    title: "Supply",
    responsible: "Supply",
    slaHours: 24, // 1 dia
    isActive: () => true,
  },
  {
    id: "taxSystems",
    title: "Sistemas Fiscais",
    responsible: "Sistemas Fiscais",
    slaHours: "TBC",
    isActive: (d) => d.requerParametrizacao === true,
  },
  {
    id: "closure",
    title: "Conclusão",
    responsible: "Solicitante Primário",
    slaHours: 0,
    isActive: () => true,
  },
];

function getActiveStepIds(data: Record<string, any>): StepId[] {
  return ABBOTT_STEPS.filter((s) => s.isActive(data)).map((s) => s.id);
}

function getNextStepId(current: StepId, data: Record<string, any>): StepId | undefined {
  const active = getActiveStepIds(data);
  const idx = active.indexOf(current);
  return idx >= 0 ? active[idx + 1] : undefined;
}

interface AbbottCtx {
  processes: AbbottProcess[];
  currentRole: Role | null;
  setRole: (r: Role) => void;
  clearSession: () => void;
  createProcess: () => AbbottProcess;
  getProcess: (id: string) => AbbottProcess | undefined;
  saveDraft: (id: string, partial: Record<string, any>) => void;
  sendToNext: (id: string, notes?: string) => void;
  getMyProcesses: () => AbbottProcess[];
}

const AbbottProcessContext = createContext<AbbottCtx | null>(null);

const STORAGE_KEY = "abbott-process-manager-v1";

// Dados simulados
const mockProcesses: AbbottProcess[] = [
  {
    id: "ABT-240811-001",
    createdAt: Date.now() - 86400000 * 2, // 2 dias atrás
    data: {
      ...defaultData,
      nomeSolicitante: "Maria Silva",
      objetivo: "Cadastro de novo reagente para laboratório",
      descricao: "Reagente X para análises de sangue - Marca LabCorp",
      itemNacional: false,
      temProposta: true,
      urgencia: "Urgente",
    },
    currentStepId: "fiscal",
    history: [
      {
        stepId: "primary",
        responsible: "Solicitante Primário",
        when: Date.now() - 86400000 * 2,
        action: "sent",
        dataSnapshot: { nomeSolicitante: "Maria Silva", objetivo: "Cadastro de novo reagente" },
      },
    ],
    stepsStart: {
      primary: { startedAt: Date.now() - 86400000 * 2, slaHours: 0 },
      services: undefined,
      fiscal: { startedAt: Date.now() - 86400000, slaHours: 48 },
      regulatory: undefined,
      requester: undefined,
      finance: undefined,
      costs: undefined,
      supply: undefined,
      taxSystems: undefined,
      closure: undefined,
    },
    closed: false,
  },
  {
    id: "ABT-240810-002", 
    createdAt: Date.now() - 86400000 * 3,
    data: {
      ...defaultData,
      nomeSolicitante: "João Santos",
      objetivo: "Cadastro de peça importada",
      descricao: "Componente eletrônico para equipamento ABC",
      itemNacional: true,
      temProposta: false,
      urgencia: "Médio",
      tipoCadastro: "Peças",
    },
    currentStepId: "services",
    history: [],
    stepsStart: {
      primary: { startedAt: Date.now() - 86400000 * 3, slaHours: 0 },
      services: { startedAt: Date.now() - 86400000, slaHours: 48 },
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
  },
];

export function AbbottProcessProvider({ children }: { children: React.ReactNode }) {
  const [processes, setProcesses] = useState<AbbottProcess[]>(mockProcesses);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.processes && parsed.processes.length > 0) {
          setProcesses(parsed.processes);
        }
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

  const api = useMemo<AbbottCtx>(() => ({
    processes,
    currentRole,
    setRole: (r) => setCurrentRole(r),
    clearSession: () => {
      setCurrentRole(null);
    },
    createProcess: () => {
      const id = `ABT-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}-${String(processes.length + 1).padStart(3, '0')}`;
      const first = ABBOTT_STEPS[0];
      const p: AbbottProcess = {
        id,
        createdAt: Date.now(),
        data: { ...defaultData, nomeSolicitante: currentRole === "Solicitante Primário" ? "Você" : "" },
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
    getMyProcesses: () => {
      if (!currentRole) return [];
      return processes.filter(p => {
        if (p.closed) return false;
        const currentStep = ABBOTT_STEPS.find(s => s.id === p.currentStepId);
        return currentStep?.responsible === currentRole;
      });
    },
    saveDraft: (id, partial) => {
      setProcesses((prev) =>
        prev.map((p) => {
          if (p.id !== id) return p;
          const data = { ...p.data, ...partial };
          const entry: HistoryEntry = {
            stepId: p.currentStepId,
            responsible: ABBOTT_STEPS.find((s) => s.id === p.currentStepId)!.responsible,
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
          const currentDef = ABBOTT_STEPS.find((s) => s.id === p.currentStepId)!;
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
            if (p.currentStepId !== "closure") {
              return {
                ...p,
                history: [entry, ...p.history],
                currentStepId: "closure",
                stepsStart: {
                  ...p.stepsStart,
                  closure: { startedAt: Date.now(), slaHours: 0 },
                },
              };
            }
            return { ...p, history: [entry, ...p.history], closed: true };
          }
          const nextDef = ABBOTT_STEPS.find((s) => s.id === next)!;
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

  return <AbbottProcessContext.Provider value={api}>{children}</AbbottProcessContext.Provider>;
}

export function useAbbottProcess() {
  const ctx = useContext(AbbottProcessContext);
  if (!ctx) throw new Error("useAbbottProcess must be used within AbbottProcessProvider");
  return ctx;
}