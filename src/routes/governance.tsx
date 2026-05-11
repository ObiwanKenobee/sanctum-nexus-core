import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatusChip } from "@/components/StatusChip";
import { KeyRound } from "lucide-react";

export const Route = createFileRoute("/governance")({
  head: () => ({
    meta: [
      { title: "Permissions & Governance · Atlas Sanctum" },
      {
        name: "description",
        content:
          "Role-based permission matrix, geographic scoping, ethical constraints, and constitutional AI rules.",
      },
    ],
  }),
  component: GovernancePage,
});

const perms = ["Read", "Advisory", "Transact", "Enforce", "Autonomous"] as const;
const roles = [
  { name: "Health Agents", grants: [true, true, true, false, false] },
  { name: "Treasury Agents", grants: [true, true, true, true, false] },
  { name: "Climate Agents", grants: [true, true, false, false, true] },
  { name: "Emergency Agents", grants: [true, true, true, true, true] },
  { name: "Governance Auditors", grants: [true, true, false, false, false] },
  { name: "Simulation Agents", grants: [true, false, false, false, true] },
];

function GovernancePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Constitutional Layer"
        title="Permission & Governance"
        description="Define what agents are allowed to do — by role, region, domain, and ethical constraint."
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="panel overflow-hidden xl:col-span-2">
          <div className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">
                Permission Matrix
              </h2>
            </div>
            <StatusChip status="nominal" label="enforced" />
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-background/30 text-left text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                <th className="px-4 py-3">Role / Cluster</th>
                {perms.map((p) => (
                  <th key={p} className="px-4 py-3 text-center">
                    {p}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {roles.map((r) => (
                <tr key={r.name} className="hover:bg-primary/5">
                  <td className="px-4 py-3 font-medium">{r.name}</td>
                  {r.grants.map((g, i) => (
                    <td key={i} className="px-4 py-3 text-center">
                      <span
                        className={
                          "inline-block h-2 w-2 rounded-full " +
                          (g ? "bg-success shadow-[0_0_8px_currentColor]" : "bg-muted")
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-4">
          <div className="panel p-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em]">Geographic Scope</h3>
            <ul className="mt-3 space-y-2 text-xs">
              {[
                ["AFR-EAST", "12 clusters"],
                ["EU-WEST", "8 clusters"],
                ["ASIA-SOUTH", "14 clusters"],
                ["AMER-N", "9 clusters"],
              ].map(([r, c]) => (
                <li
                  key={r}
                  className="flex items-center justify-between rounded-md border border-border bg-background/40 px-3 py-2 font-mono"
                >
                  <span className="text-primary">{r}</span>
                  <span className="text-muted-foreground">{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="panel p-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em]">Compliance</h3>
            <div className="mt-3 space-y-2 text-xs">
              {[
                ["EU AI Act", "compliant", "nominal"],
                ["ISO 42001", "compliant", "nominal"],
                ["Constitutional CR-44", "draft", "warning"],
              ].map(([n, s, st]) => (
                <div
                  key={n}
                  className="flex items-center justify-between rounded-md border border-border bg-background/40 px-3 py-2"
                >
                  <span>{n}</span>
                  <StatusChip status={st as any} label={s as string} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
