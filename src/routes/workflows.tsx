import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatusChip } from "@/components/StatusChip";
import { Play, GitBranch, AlertTriangle, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/workflows")({
  head: () => ({
    meta: [
      { title: "Workflow Engine · Atlas Sanctum" },
      {
        name: "description",
        content:
          "Visual orchestration of multi-agent workflows: chaining, triggers, and cross-domain coordination.",
      },
    ],
  }),
  component: WorkflowsPage,
});

const steps = [
  { id: "trigger", label: "Flood Sensor Trigger", sub: "edge://kibera-04", status: "done" },
  { id: "emergency", label: "Emergency AI Agent", sub: "AGT-9921 · 240ms", status: "done" },
  { id: "health", label: "Health Risk Agent", sub: "AGT-2104 · 318ms", status: "running" },
  { id: "alert", label: "Community Alert Agent", sub: "AGT-7733 · queued", status: "pending" },
  {
    id: "treasury",
    label: "Treasury Allocation",
    sub: "AGT-4421 · awaits human",
    status: "pending",
  },
  { id: "human", label: "Human Approval Layer", sub: "OPS-LEAD · escalated", status: "pending" },
];

const flows = [
  { name: "flood-response-v3", runs: 184, success: 99.2, status: "nominal" as const },
  { name: "outbreak-triage-v2", runs: 91, success: 97.8, status: "nominal" as const },
  { name: "treasury-rebalance", runs: 12, success: 83.0, status: "warning" as const },
  { name: "carbon-credit-issuance", runs: 47, success: 100, status: "nominal" as const },
  { name: "grid-failover-v5", runs: 6, success: 100, status: "info" as const },
];

function WorkflowsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Multi-Agent Orchestration"
        title="Workflow Engine"
        description="Compose autonomous workflows. Chain agents across domains with conditional logic, fallbacks, and human-in-the-loop checkpoints."
        actions={
          <button className="flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-primary-foreground hover:opacity-90">
            <Play className="h-3.5 w-3.5" /> New Workflow
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="panel scan-line relative overflow-hidden p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">
                Live Execution · flood-response-v3
              </h2>
            </div>
            <StatusChip status="info" label="executing" pulse />
          </div>

          <div className="mt-6 space-y-2">
            {steps.map((s, i) => (
              <div key={s.id}>
                <div
                  className={
                    "flex items-center gap-3 rounded-md border p-3 transition-colors " +
                    (s.status === "running"
                      ? "border-primary/60 bg-primary/5 shadow-[var(--shadow-glow)]"
                      : s.status === "done"
                        ? "border-success/40 bg-success/5"
                        : "border-border bg-background/30")
                  }
                >
                  <div
                    className={
                      "flex h-8 w-8 items-center justify-center rounded-md font-mono text-xs " +
                      (s.status === "done"
                        ? "bg-success/20 text-success"
                        : s.status === "running"
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground")
                    }
                  >
                    {s.status === "done" ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{s.label}</div>
                    <div className="font-mono text-[11px] text-muted-foreground">{s.sub}</div>
                  </div>
                  <StatusChip
                    status={
                      s.status === "done" ? "nominal" : s.status === "running" ? "info" : "offline"
                    }
                    label={s.status}
                    pulse={s.status === "running"}
                  />
                </div>
                {i < steps.length - 1 && (
                  <div className="ml-4 h-3 w-px bg-gradient-to-b from-primary/60 to-border" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="panel p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Active Workflows</h2>
            <ul className="mt-3 space-y-2">
              {flows.map((f) => (
                <li
                  key={f.name}
                  className="rounded-md border border-border bg-background/40 p-3 hover:border-primary/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-foreground">{f.name}</span>
                    <StatusChip status={f.status} label={f.status} />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>{f.runs} runs · 24h</span>
                    <span className="font-mono">{f.success}% ok</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="panel p-5">
            <div className="flex items-center gap-2 text-accent">
              <AlertTriangle className="h-4 w-4" />
              <h3 className="text-sm font-semibold">Fallback Routing</h3>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              When a downstream agent fails, the engine routes to the configured fallback chain.
              treasury-rebalance currently has 2 fallback chains armed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
