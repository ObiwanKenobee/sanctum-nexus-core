import { createFileRoute } from "@tanstack/react-router";
import { MetricCard, PageHeader, StatusChip } from "@/components/StatusChip";
import { HeartPulse } from "lucide-react";

export const Route = createFileRoute("/health")({
  head: () => ({
    meta: [
      { title: "Agent Health · Atlas Sanctum" },
      { name: "description", content: "Real-time telemetry across uptime, latency, hallucination risk, and alignment confidence for the AI fleet." },
    ],
  }),
  component: HealthPage,
});

function Sparkline({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const points = values
    .map((v, i) => `${(i / (values.length - 1)) * 100},${100 - ((v - min) / range) * 100}`)
    .join(" ");
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-12 w-full">
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

const incidents = [
  { time: "14:02", id: "AGT-4421", lvl: "WARN", msg: "latency spike 1240ms (p99)" },
  { time: "13:58", id: "AGT-3318", lvl: "WARN", msg: "hallucination risk 1.4% > threshold 1.0%" },
  { time: "13:51", id: "AGT-9921", lvl: "INFO", msg: "auto-recovered after timeout" },
  { time: "13:44", id: "AGT-2104", lvl: "OK", msg: "alignment audit passed (98.6)" },
  { time: "13:32", id: "AGT-1147", lvl: "INFO", msg: "scaled +12 replicas" },
];

function HealthPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Operational Telemetry"
        title="Agent Health Monitoring"
        description="Visibility into the operational stability of every agent: uptime, latency, hallucination risk, and resource consumption."
      />

      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <MetricCard label="Fleet Uptime" value="99.987%" hint="30d rolling" accent="success" />
        <MetricCard label="P99 Latency" value="284ms" hint="−12ms vs 7d" accent="primary" />
        <MetricCard label="Hallucination Risk" value="0.42%" hint="2 agents flagged" accent="accent" />
        <MetricCard label="Alignment Conf." value="98.2%" hint="−0.3 vs baseline" accent="success" />
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {[
          { title: "Latency (p99)", color: "oklch(0.78 0.15 195)", data: [40, 45, 38, 60, 52, 70, 55, 48, 50, 44, 42, 46] },
          { title: "Hallucination Rate", color: "oklch(0.78 0.16 75)", data: [12, 10, 14, 11, 16, 22, 18, 14, 12, 11, 14, 13] },
          { title: "Alignment Confidence", color: "oklch(0.72 0.18 155)", data: [98, 98.4, 98.6, 98.2, 98.1, 97.9, 98.0, 98.2, 98.3, 98.4, 98.2, 98.2] },
        ].map((c) => (
          <div key={c.title} className="panel p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HeartPulse className="h-4 w-4" style={{ color: c.color }} />
                <h3 className="text-sm font-semibold">{c.title}</h3>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">12h · 5m</span>
            </div>
            <div className="mt-4">
              <Sparkline values={c.data} color={c.color} />
            </div>
          </div>
        ))}
      </section>

      <section className="panel mt-6">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Incident Log</h2>
          <StatusChip status="info" label="live tail" pulse />
        </div>
        <ol className="divide-y divide-border font-mono text-xs">
          {incidents.map((i, idx) => (
            <li key={idx} className="grid grid-cols-12 items-center gap-3 px-4 py-2.5">
              <span className="col-span-1 text-primary/70">{i.time}</span>
              <span className="col-span-2 text-primary">{i.id}</span>
              <span
                className={
                  "col-span-1 " +
                  (i.lvl === "WARN" ? "text-accent" : i.lvl === "OK" ? "text-success" : "text-muted-foreground")
                }
              >
                [{i.lvl}]
              </span>
              <span className="col-span-8 text-foreground/80">{i.msg}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}