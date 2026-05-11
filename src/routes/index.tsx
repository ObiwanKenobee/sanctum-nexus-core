import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Activity,
  Cpu,
  Users,
  Workflow,
  Brain,
  ChevronRight,
  Radio,
} from "lucide-react";
import { MetricCard, PageHeader, StatusChip } from "@/components/StatusChip";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mission Control · Atlas Sanctum Command Center" },
      {
        name: "description",
        content:
          "Real-time global status of every autonomous AI agent across health, climate, finance, and governance domains.",
      },
    ],
  }),
  component: MissionControl,
});

const incidents = [
  {
    id: "INC-2841",
    severity: "critical" as const,
    title: "Treasury Agent #4421 — anomalous disbursement pattern",
    region: "EU-WEST",
    time: "00:42 ago",
  },
  {
    id: "INC-2839",
    severity: "warning" as const,
    title: "Health agent cluster: hallucination rate above 1.2%",
    region: "AFR-EAST",
    time: "06:11 ago",
  },
  {
    id: "INC-2837",
    severity: "warning" as const,
    title: "Climate sim drift detected on monsoon model v8.4",
    region: "ASIA-SOUTH",
    time: "12:03 ago",
  },
  {
    id: "INC-2832",
    severity: "info" as const,
    title: "Governance auditor flagged policy update for review",
    region: "GLOBAL",
    time: "1h 02m ago",
  },
];

const domains = [
  { name: "Public Health", agents: 2104, load: 72, trend: "+3.4%", status: "nominal" as const },
  { name: "Climate Systems", agents: 3318, load: 64, trend: "+1.1%", status: "nominal" as const },
  {
    name: "Treasury & Finance",
    agents: 1247,
    load: 88,
    trend: "+9.2%",
    status: "warning" as const,
  },
  { name: "Emergency Response", agents: 982, load: 41, trend: "−2.0%", status: "nominal" as const },
  { name: "Infrastructure", agents: 2890, load: 57, trend: "+0.6%", status: "nominal" as const },
  { name: "Governance Audit", agents: 612, load: 33, trend: "+0.0%", status: "info" as const },
];

function MissionControl() {
  return (
    <div>
      <PageHeader
        eyebrow="Global Operations · L0 Overview"
        title="Mission Control"
        description="Coordinated state of the autonomous AI civilization layer. All metrics streamed in real time from edge regions."
        actions={
          <>
            <StatusChip status="nominal" label="Systems Nominal" pulse />
            <button className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-destructive hover:bg-destructive/20">
              Engage Kill-Switch
            </button>
          </>
        }
      />

      <section className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        <MetricCard label="Active Agents" value="12,842" hint="+184 last hour" accent="primary" />
        <MetricCard
          label="Critical Alerts"
          value="7"
          hint="2 awaiting human"
          accent="destructive"
        />
        <MetricCard label="Human Overrides" value="3" hint="Active interventions" accent="accent" />
        <MetricCard label="Autonomous Tasks" value="48,229" hint="Last 24h" accent="primary" />
        <MetricCard
          label="Alignment Score"
          value="98.2%"
          hint="−0.3 vs baseline"
          accent="success"
        />
        <MetricCard label="Sim Accuracy" value="94.7%" hint="Across 38 models" accent="success" />
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="panel scan-line relative overflow-hidden p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">
                Domain Telemetry
              </h2>
            </div>
            <Link
              to="/health"
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
            >
              Open monitor <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="mt-4 divide-y divide-border">
            {domains.map((d) => (
              <div key={d.name} className="grid grid-cols-12 items-center gap-3 py-3 text-sm">
                <div className="col-span-4 font-medium">{d.name}</div>
                <div className="col-span-2 font-mono text-muted-foreground">
                  {d.agents.toLocaleString()} agents
                </div>
                <div className="col-span-4">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={
                        "h-full rounded-full " +
                        (d.load > 80 ? "bg-destructive" : d.load > 60 ? "bg-accent" : "bg-primary")
                      }
                      style={{ width: `${d.load}%` }}
                    />
                  </div>
                </div>
                <div className="col-span-1 text-right font-mono text-xs text-muted-foreground">
                  {d.trend}
                </div>
                <div className="col-span-1 flex justify-end">
                  <StatusChip status={d.status} label={d.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-accent" />
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Live Incidents</h2>
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">PRIORITY QUEUE</span>
          </div>
          <ul className="mt-3 space-y-3">
            {incidents.map((i) => (
              <li
                key={i.id}
                className="rounded-md border border-border bg-background/40 p-3 transition-colors hover:border-primary/40"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-muted-foreground">{i.id}</span>
                  <StatusChip status={i.severity} label={i.severity} />
                </div>
                <p className="mt-1 text-sm leading-snug text-foreground">{i.title}</p>
                <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                  <span>{i.region}</span>
                  <span>{i.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            icon: Users,
            title: "Agent Registry",
            to: "/agents",
            desc: "12,842 agents online · 7 categories",
          },
          {
            icon: Workflow,
            title: "Workflow Engine",
            to: "/workflows",
            desc: "184 chains running · 12 awaiting trigger",
          },
          {
            icon: Brain,
            title: "Reasoning Traces",
            to: "/reasoning",
            desc: "Inspect explainable decision lineage",
          },
          {
            icon: Cpu,
            title: "Simulation Lab",
            to: "/simulation",
            desc: "Stress test before production deploy",
          },
        ].map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="panel group flex flex-col gap-2 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[var(--shadow-glow)]"
          >
            <div className="flex items-center justify-between">
              <c.icon className="h-5 w-5 text-primary" />
              <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </div>
            <div className="text-sm font-semibold">{c.title}</div>
            <div className="text-xs text-muted-foreground">{c.desc}</div>
          </Link>
        ))}
      </section>

      <section className="panel mt-6 p-5">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Agent Activity Feed</h2>
          <span className="ml-auto font-mono text-[10px] text-muted-foreground">
            STREAMING · WS
          </span>
        </div>
        <ol className="mt-3 space-y-2 font-mono text-xs">
          {[
            {
              t: "14:08:21",
              lvl: "INFO",
              txt: "agent[health-2104] dispatched outbreak prediction → triage-router",
            },
            {
              t: "14:08:19",
              lvl: "WARN",
              txt: "agent[treasury-4421] requires consensus (3/5) for $182,400 disbursement",
            },
            {
              t: "14:08:17",
              lvl: "INFO",
              txt: "workflow[flood-response-v3] completed in 1.84s — 12 agents",
            },
            {
              t: "14:08:14",
              lvl: "OK  ",
              txt: "alignment audit passed for governance-cluster (98.4%)",
            },
            {
              t: "14:08:09",
              lvl: "WARN",
              txt: "recursive loop guard tripped on simulation-agent[sim-228]",
            },
            {
              t: "14:08:02",
              lvl: "INFO",
              txt: "human override accepted — emergency-9921 paused by OPS-LEAD",
            },
          ].map((row, i) => (
            <li key={i} className="flex gap-3 text-muted-foreground">
              <span className="text-primary/70">{row.t}</span>
              <span
                className={
                  row.lvl.includes("WARN")
                    ? "text-accent"
                    : row.lvl.includes("OK")
                      ? "text-success"
                      : "text-primary"
                }
              >
                [{row.lvl}]
              </span>
              <span className="text-foreground/80">{row.txt}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
