import { STEPS } from "@/context/ProcessContext";
import type { HistoryEntry, Process } from "@/context/ProcessContext";

export function HistoryPanel({ process }: { process: Process }) {
  const entries = process.history;
  const getStepTitle = (id: string) => STEPS.find((s) => s.id === id)?.title || id;

  return (
    <aside className="w-full lg:w-80 border-l bg-card">
      <div className="p-4 border-b">
        <h2 className="text-sm font-medium">Histórico</h2>
        <p className="text-xs text-muted-foreground">Registro imutável por etapa</p>
      </div>
      <div className="p-4 space-y-4">
        {entries.length === 0 && (
          <p className="text-sm text-muted-foreground">Sem registros ainda.</p>
        )}
        {entries.map((e: HistoryEntry, idx) => (
          <article key={idx} className="rounded-lg border p-3 bg-background">
            <header className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{new Date(e.when).toLocaleString()}</span>
              <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-secondary">{e.action}</span>
            </header>
            <h3 className="mt-1 text-sm font-medium">{getStepTitle(e.stepId)}</h3>
            <p className="text-xs text-muted-foreground">Responsável: {e.responsible}</p>
            {e.notes && <p className="mt-1 text-xs">Obs.: {e.notes}</p>}
          </article>
        ))}
      </div>
    </aside>
  );
}
