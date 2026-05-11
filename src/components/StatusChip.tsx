import { cn } from "@/lib/utils";

type Status = "nominal" | "warning" | "critical" | "offline" | "info";

const styles: Record<Status, string> = {
  nominal: "bg-success/15 text-success border-success/40",
  warning: "bg-accent/15 text-accent border-accent/40",
  critical: "bg-destructive/15 text-destructive border-destructive/40",
  offline: "bg-muted text-muted-foreground border-border",
  info: "bg-primary/15 text-primary border-primary/40",
};

export function StatusChip({
  status,
  label,
  pulse,
  className,
}: {
  status: Status;
  label: string;
  pulse?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider",
        styles[status],
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full bg-current", pulse && "live-dot")} />
      {label}
    </span>
  );
}

export function MetricCard({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: string;
  hint?: string;
  accent?: "primary" | "accent" | "success" | "destructive";
}) {
  const ring =
    accent === "destructive"
      ? "ring-destructive/40"
      : accent === "accent"
        ? "ring-accent/40"
        : accent === "success"
          ? "ring-success/40"
          : "ring-primary/30";
  const text =
    accent === "destructive"
      ? "text-destructive"
      : accent === "accent"
        ? "text-accent"
        : accent === "success"
          ? "text-success"
          : "text-primary";
  return (
    <div className={cn("panel relative overflow-hidden p-4 ring-1", ring)}>
      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
      <div className={cn("mt-2 font-mono text-3xl font-semibold tabular-nums glow-text", text)}>
        {value}
      </div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-current opacity-[0.04]" />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4">
      <div>
        <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">
          {eyebrow}
        </div>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
        {description && (
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  );
}
