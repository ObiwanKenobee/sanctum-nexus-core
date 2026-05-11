import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatusChip } from "@/components/StatusChip";
import { ShieldAlert, Pause, XOctagon, Check } from "lucide-react";

export const Route = createFileRoute("/overrides")({
  head: () => ({
    meta: [
      { title: "Human Override · Atlas Sanctum" },
      {
        name: "description",
        content:
          "Pause agents, revoke permissions, kill-switch controls, and approval queues for high-risk autonomous actions.",
      },
    ],
  }),
  component: OverridesPage,
});

const queue = [
  {
    id: "APR-9921",
    title: "Disburse $182,400 emergency aid → Kibera Zone 4",
    cat: "Financial",
    risk: "critical" as const,
    agent: "AGT-4421",
  },
  {
    id: "APR-9920",
    title: "Shut down regional grid sector G-7 for 12min failover",
    cat: "Infrastructure",
    risk: "warning" as const,
    agent: "AGT-1147",
  },
  {
    id: "APR-9918",
    title: "Issue population-level outbreak advisory (1.2M reach)",
    cat: "Population",
    risk: "warning" as const,
    agent: "AGT-2104",
  },
  {
    id: "APR-9915",
    title: "Update constitutional rule CR-44 (sandbox proposal)",
    cat: "Policy",
    risk: "info" as const,
    agent: "AGT-0612",
  },
];

function OverridesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Ultimate Safeguard"
        title="Human Override & Intervention"
        description="The constitutional layer of last resort. Pause, revoke, escalate, or fully halt any autonomous action."
        actions={
          <button className="flex items-center gap-2 rounded-md border border-destructive bg-destructive/10 px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-destructive hover:bg-destructive/20">
            <XOctagon className="h-3.5 w-3.5" /> Global Kill-Switch
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="panel p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-accent" />
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Approval Queue</h2>
            </div>
            <StatusChip status="warning" label="4 pending" pulse />
          </div>
          <ul className="mt-4 space-y-3">
            {queue.map((q) => (
              <li
                key={q.id}
                className="rounded-md border border-border bg-background/40 p-4 transition-colors hover:border-primary/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-[11px] font-mono">
                      <span className="text-primary">{q.id}</span>
                      <span className="text-muted-foreground">· {q.cat}</span>
                      <span className="text-muted-foreground">· {q.agent}</span>
                    </div>
                    <p className="mt-1 text-sm font-medium">{q.title}</p>
                  </div>
                  <StatusChip status={q.risk} label={q.risk} />
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button className="flex items-center gap-1 rounded-md bg-success/15 px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-success hover:bg-success/25">
                    <Check className="h-3.5 w-3.5" /> Approve
                  </button>
                  <button className="flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground">
                    <Pause className="h-3.5 w-3.5" /> Pause Agent
                  </button>
                  <button className="flex items-center gap-1 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-destructive hover:bg-destructive/20">
                    <XOctagon className="h-3.5 w-3.5" /> Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="panel p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Active Overrides</h2>
          <ul className="mt-3 space-y-2 text-xs">
            {[
              ["AGT-4421", "Paused · transactional revoked"],
              ["sim-228", "Sandboxed · loop guard"],
              ["AGT-3318", "Throttled · 30% capacity"],
            ].map(([a, s]) => (
              <li key={a} className="rounded-md border border-border bg-background/40 p-3">
                <div className="font-mono text-primary">{a}</div>
                <div className="text-muted-foreground">{s}</div>
              </li>
            ))}
          </ul>
          <div className="mt-5 rounded-md border border-accent/30 bg-accent/5 p-3 text-xs text-muted-foreground">
            <span className="font-semibold text-accent">Reminder:</span> All override actions are
            cryptographically signed and immutably logged.
          </div>
        </div>
      </div>
    </div>
  );
}
