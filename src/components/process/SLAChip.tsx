import { useEffect, useMemo, useState } from "react";

export function SLAChip({ startedAt, slaHours }: { startedAt?: number; slaHours: number | "TBC" }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (slaHours === "TBC" || !startedAt) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [slaHours, startedAt]);

  const { label, tone } = useMemo(() => {
    if (slaHours === "TBC" || !startedAt) return { label: "SLA: TBC", tone: "default" } as const;
    const ms = slaHours * 3600 * 1000;
    const left = startedAt + ms - now;
    const abs = Math.abs(left);
    const h = Math.floor(abs / 3600000);
    const m = Math.floor((abs % 3600000) / 60000);
    const s = Math.floor((abs % 60000) / 1000);
    if (left < 0) return { label: `Atrasado ${h}h ${m}m ${s}s`, tone: "destructive" } as const;
    if (left < ms * 0.2) return { label: `Crítico ${h}h ${m}m ${s}s`, tone: "warning" } as const;
    return { label: `Restante ${h}h ${m}m ${s}s`, tone: "ok" } as const;
  }, [now, slaHours, startedAt]);

  const cls =
    tone === "destructive"
      ? "bg-destructive/10 text-destructive border-destructive/30"
      : tone === "warning"
      ? "bg-accent text-foreground border-border"
      : tone === "ok"
      ? "bg-secondary text-foreground border-border"
      : "bg-muted text-muted-foreground border-border";

  return (
    <span className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs border ${cls}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {label}
    </span>
  );
}
