import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatusChip } from "@/components/StatusChip";
import { Search, Filter, Plus } from "lucide-react";

export const Route = createFileRoute("/agents")({
  head: () => ({
    meta: [
      { title: "Agent Registry · Atlas Sanctum" },
      { name: "description", content: "Searchable directory of all autonomous AI agents — identity, capabilities, trust scores, and runtime status." },
    ],
  }),
  component: AgentsPage,
});

const agents = [
  { id: "AGT-2104", name: "Outbreak Predictor α", cat: "Health", region: "AFR-EAST", trust: 96, ver: "v3.2.1", status: "nominal" as const },
  { id: "AGT-4421", name: "Treasury Disbursement", cat: "Finance", region: "EU-WEST", trust: 71, ver: "v2.0.4", status: "warning" as const },
  { id: "AGT-3318", name: "Monsoon Drift Model", cat: "Climate", region: "ASIA-SOUTH", trust: 89, ver: "v8.4.0", status: "warning" as const },
  { id: "AGT-9921", name: "Flood Response Coord.", cat: "Emergency", region: "ASIA-SE", trust: 94, ver: "v1.7.2", status: "info" as const },
  { id: "AGT-1147", name: "Grid Load Balancer", cat: "Infrastructure", region: "AMER-N", trust: 99, ver: "v5.1.0", status: "nominal" as const },
  { id: "AGT-0612", name: "Constitution Auditor", cat: "Governance", region: "GLOBAL", trust: 100, ver: "v1.0.9", status: "nominal" as const },
  { id: "AGT-2280", name: "Synthetic City Sim", cat: "Simulation", region: "GLOBAL", trust: 88, ver: "v4.0.0", status: "nominal" as const },
  { id: "AGT-7733", name: "Community Alert Mesh", cat: "Emergency", region: "AFR-WEST", trust: 92, ver: "v2.3.1", status: "nominal" as const },
  { id: "AGT-5512", name: "Vaccine Logistics", cat: "Health", region: "AMER-S", trust: 90, ver: "v3.0.2", status: "nominal" as const },
  { id: "AGT-6601", name: "Carbon Market Maker", cat: "Finance", region: "GLOBAL", trust: 84, ver: "v1.4.5", status: "info" as const },
];

const categories = ["All", "Health", "Climate", "Finance", "Emergency", "Infrastructure", "Governance", "Simulation"];

function AgentsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Identity Layer"
        title="Agent Registry"
        description="Central directory of all 12,842 active AI agents across the Atlas Sanctum ecosystem."
        actions={
          <button className="flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-primary-foreground hover:opacity-90">
            <Plus className="h-3.5 w-3.5" /> Register Agent
          </button>
        }
      />

      <div className="panel mb-4 flex flex-wrap items-center gap-2 p-3">
        <div className="flex flex-1 items-center gap-2 rounded-md border border-border bg-background/50 px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            placeholder="search by id, name, region, capability…"
            className="flex-1 bg-transparent font-mono text-xs outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex items-center gap-1">
          {categories.map((c, i) => (
            <button
              key={c}
              className={
                "rounded-md border px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider transition-colors " +
                (i === 0
                  ? "border-primary/50 bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground")
              }
            >
              {c}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-1 rounded-md border border-border px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground">
          <Filter className="h-3.5 w-3.5" /> Filters
        </button>
      </div>

      <div className="panel overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-background/30 text-left text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
              <th className="px-4 py-3">Agent ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Region</th>
              <th className="px-4 py-3">Trust</th>
              <th className="px-4 py-3">Version</th>
              <th className="px-4 py-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {agents.map((a) => (
              <tr key={a.id} className="transition-colors hover:bg-primary/5">
                <td className="px-4 py-3 font-mono text-xs text-primary">{a.id}</td>
                <td className="px-4 py-3 font-medium">{a.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{a.cat}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{a.region}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-16 overflow-hidden rounded-full bg-muted">
                      <div
                        className={
                          "h-full " + (a.trust >= 90 ? "bg-success" : a.trust >= 75 ? "bg-accent" : "bg-destructive")
                        }
                        style={{ width: `${a.trust}%` }}
                      />
                    </div>
                    <span className="font-mono text-xs tabular-nums">{a.trust}</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{a.ver}</td>
                <td className="px-4 py-3 text-right">
                  <StatusChip status={a.status} label={a.status} pulse={a.status !== "nominal"} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}