import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Bot, 
  Workflow, 
  PlayCircle, 
  Settings, 
  Sparkles 
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Agents", href: "/agents", icon: Bot },
  { name: "Workflows", href: "/workflows", icon: Workflow },
  { name: "Executions", href: "/executions", icon: PlayCircle },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-sidebar flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow-primary">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-sidebar-foreground">Agentic Studio</h1>
              <p className="text-xs text-muted-foreground">Multi-Agent Framework</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary shadow-glow-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="px-4 py-3 rounded-lg bg-sidebar-accent/30 border border-sidebar-border">
            <p className="text-xs text-muted-foreground">Framework v1.0.0</p>
            <p className="text-xs text-sidebar-foreground font-medium mt-1">Ready to orchestrate</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};
