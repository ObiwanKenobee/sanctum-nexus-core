import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  Network,
  GitBranch,
  HeartPulse,
  Brain,
  ShieldAlert,
  KeyRound,
  FlaskConical,
  Scale,
  Globe2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

const operations = [
  { title: "Mission Control", url: "/", icon: Activity },
  { title: "Agent Registry", url: "/agents", icon: Network },
  { title: "Workflows", url: "/workflows", icon: GitBranch },
  { title: "Agent Health", url: "/health", icon: HeartPulse },
  { title: "Global Network", url: "/network", icon: Globe2 },
];

const safety = [
  { title: "Reasoning Traces", url: "/reasoning", icon: Brain },
  { title: "Human Override", url: "/overrides", icon: ShieldAlert },
  { title: "Permissions", url: "/governance", icon: KeyRound },
  { title: "Policy Engine", url: "/policy", icon: Scale },
  { title: "Simulation Lab", url: "/simulation", icon: FlaskConical },
];

export function AppSidebar() {
  const currentPath = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (p: string) => currentPath === p;

  const renderItem = (item: {
    title: string;
    url: string;
    icon: React.ComponentType<{ className?: string }>;
  }) => (
    <SidebarMenuItem key={item.url}>
      <SidebarMenuButton asChild isActive={isActive(item.url)}>
        <Link to={item.url} className="flex items-center gap-3">
          <item.icon className="h-4 w-4" />
          <span className="text-sm">{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8 rounded-md bg-primary/15 ring-1 ring-primary/40 flex items-center justify-center">
            <span className="absolute inset-0 rounded-md bg-primary/20 blur-md" />
            <Activity className="h-4 w-4 text-primary relative" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Atlas Sanctum
            </span>
            <span className="text-sm font-semibold text-foreground glow-text">Command Center</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-[0.18em]">
            Operations
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{operations.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-[0.18em]">
            Safety & Governance
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{safety.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="live-dot inline-block h-2 w-2 rounded-full bg-success" />
          <span className="font-mono">SYS NOMINAL · v2.4.1</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
