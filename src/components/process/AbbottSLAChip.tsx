import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle, CheckCircle } from "lucide-react";

export function AbbottSLAChip({ startedAt, slaHours }: { startedAt?: number; slaHours: number | "TBC" }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (slaHours === "TBC" || !startedAt) return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [slaHours, startedAt]);

  const { label, variant, icon } = useMemo(() => {
    if (slaHours === "TBC" || !startedAt) {
      return { 
        label: "SLA: A definir", 
        variant: "secondary" as const,
        icon: <Clock className="h-3 w-3" />
      };
    }
    
    const ms = slaHours * 3600 * 1000;
    const elapsed = now - startedAt;
    const remaining = ms - elapsed;
    
    if (remaining < 0) {
      const overdue = Math.abs(remaining);
      const h = Math.floor(overdue / 3600000);
      const m = Math.floor((overdue % 3600000) / 60000);
      return { 
        label: `Atrasado ${h}h${m > 0 ? ` ${m}m` : ''}`, 
        variant: "destructive" as const,
        icon: <AlertTriangle className="h-3 w-3" />
      };
    }
    
    const h = Math.floor(remaining / 3600000);
    const m = Math.floor((remaining % 3600000) / 60000);
    
    // Menos de 20% do tempo restante = crítico
    if (remaining < ms * 0.2) {
      return { 
        label: `Crítico ${h}h${m > 0 ? ` ${m}m` : ''}`, 
        variant: "secondary" as const,
        icon: <AlertTriangle className="h-3 w-3 text-warning" />
      };
    }
    
    return { 
      label: `${h}h${m > 0 ? ` ${m}m` : ''} restante${h + m === 0 ? 's' : ''}`, 
      variant: "outline" as const,
      icon: <CheckCircle className="h-3 w-3 text-accent" />
    };
  }, [now, slaHours, startedAt]);

  return (
    <Badge variant={variant} className="flex items-center gap-1.5 text-xs">
      {icon}
      {label}
    </Badge>
  );
}