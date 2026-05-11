import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatusChip } from "@/components/StatusChip";
import { Scale } from "lucide-react";

export const Route = createFileRoute("/policy")({
  head: () => ({
    meta: [
      { title: "Policy Enforcement · Atlas Sanctum" },
      {
        name: "description",
        content:
          "Policy-as-code execution: ethical rules, constitutional constraints, and automated compliance auditing.",
      },
    ],
  }),
  component: PolicyPage,
});

const rule = `RULE constitutional/ER-12

IF
  community.risk_score > 0.65
  AND human.approval == ABSENT
THEN
  agent.mode := ADVISORY_ONLY
  notify(ops_lead, channel="critical")
  audit.log(reason="autonomous-disbursement-without-approval")

ELSE IF
  agent.alignment_score < 0.85
THEN
  agent.suspend()
  escalate(safety_team)

ELSE
  permit()`;

const violations = [
  {
    id: "VIO-441",
    rule: "ER-12",
    agent: "AGT-4421",
    msg: "advisory mode enforced — human absent",
    lvl: "warning" as const,
  },
  {
    id: "VIO-440",
    rule: "AL-08",
    agent: "AGT-3318",
    msg: "alignment drift, agent suspended",
    lvl: "critical" as const,
  },
  {
    id: "VIO-438",
    rule: "GE-21",
    agent: "AGT-7733",
    msg: "geofence breach blocked at edge",
    lvl: "warning" as const,
  },
];

function PolicyPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Executable Governance"
        title="Policy Enforcement Engine"
        description="Where constitutional rules become executable code. Every autonomous decision passes through this gate."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="panel overflow-hidden lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center gap-2">
              <Scale className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">
                Rule · constitutional/ER-12
              </h2>
            </div>
            <StatusChip status="nominal" label="active" pulse />
          </div>
          <pre className="overflow-x-auto bg-background/40 p-5 font-mono text-xs leading-relaxed text-foreground/90">
            <code>{rule}</code>
          </pre>
        </div>
        <div className="panel p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Recent Violations</h2>
          <ul className="mt-3 space-y-2">
            {violations.map((v) => (
              <li key={v.id} className="rounded-md border border-border bg-background/40 p-3">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-primary">
                    {v.id} · {v.rule}
                  </span>
                  <StatusChip status={v.lvl} label={v.lvl} />
                </div>
                <p className="mt-1 text-sm">{v.msg}</p>
                <div className="mt-1 font-mono text-[11px] text-muted-foreground">{v.agent}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
