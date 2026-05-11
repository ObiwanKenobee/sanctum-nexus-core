import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatusChip } from "@/components/StatusChip";
import { Brain, FileSearch, Link2 } from "lucide-react";

export const Route = createFileRoute("/reasoning")({
  head: () => ({
    meta: [
      { title: "Reasoning Trace Explorer · Atlas Sanctum" },
      {
        name: "description",
        content:
          "Step-by-step reasoning chains, source verification, prompt lineage, and inter-agent communication logs.",
      },
    ],
  }),
  component: ReasoningPage,
});

const trace = [
  {
    step: 1,
    agent: "AGT-2104",
    text: "Water contamination index = 0.78 — exceeds threshold 0.60.",
    conf: 0.99,
    src: "sensor://kibera-04",
  },
  {
    step: 2,
    agent: "AGT-2104",
    text: "Predicted outbreak probability over next 72h: 64%.",
    conf: 0.91,
    src: "model://outbreak-v3.2",
  },
  {
    step: 3,
    agent: "AGT-4421",
    text: "Treasury reserve confirms 312k USD available in regional pool.",
    conf: 1.0,
    src: "ledger://afr-east",
  },
  {
    step: 4,
    agent: "AGT-0612",
    text: "Emergency Response Policy ER-12 validated — no constraint violations.",
    conf: 0.97,
    src: "policy://ER-12",
  },
  {
    step: 5,
    agent: "AGT-9921",
    text: "Action exceeds autonomous threshold (USD 50k). Escalating to human approval.",
    conf: 1.0,
    src: "rule://constitutional/escalation",
  },
];

function ReasoningPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Explainable AI"
        title="Reasoning Trace Explorer"
        description="Inspect the full decision lineage of any autonomous action — sources, confidence, prompt history, and inter-agent handoffs."
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="panel scan-line relative overflow-hidden p-5 xl:col-span-2">
          <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-primary">
                Decision · DCN-22841
              </div>
              <h2 className="mt-1 text-lg font-semibold">
                Allocate emergency water resources to Kibera Zone 4
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="font-mono">Initiated by AGT-9921 · 14:03:22 UTC</span>
                <StatusChip status="warning" label="Awaiting Human" pulse />
              </div>
            </div>
            <button className="flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground">
              <FileSearch className="h-3.5 w-3.5" /> Export trace
            </button>
          </div>

          <ol className="mt-5 space-y-4">
            {trace.map((t) => (
              <li key={t.step} className="relative pl-10">
                <div className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-mono text-xs text-primary">
                  {t.step}
                </div>
                {t.step < trace.length && (
                  <div className="absolute left-3.5 top-7 h-full w-px bg-border" />
                )}
                <div className="rounded-md border border-border bg-background/40 p-3">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-primary">{t.agent}</span>
                    <span className="text-muted-foreground">conf {t.conf.toFixed(2)}</span>
                  </div>
                  <p className="mt-1.5 text-sm text-foreground">{t.text}</p>
                  <div className="mt-2 flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Link2 className="h-3 w-3" />
                    <span className="font-mono">{t.src}</span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-4">
          <div className="panel p-5">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em]">
                Model Attribution
              </h3>
            </div>
            <ul className="mt-3 space-y-2 text-xs">
              {[
                ["Outbreak v3.2", "AGT-2104"],
                ["Treasury Engine v2", "AGT-4421"],
                ["Constitution Auditor", "AGT-0612"],
                ["Emergency Coordinator", "AGT-9921"],
              ].map(([m, a]) => (
                <li
                  key={m}
                  className="flex items-center justify-between rounded-md border border-border bg-background/40 px-3 py-2 font-mono"
                >
                  <span className="text-foreground">{m}</span>
                  <span className="text-primary">{a}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="panel p-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em]">Why this matters</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Without reasoning visibility, autonomous systems become opaque, trust collapses, and
              liability becomes impossible to manage. Every decision is traceable to source.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
