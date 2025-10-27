import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Workflow, PlayCircle, Plus, TrendingUp, Activity } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const stats = [
    { label: "Active Agents", value: "12", icon: Bot, color: "text-primary" },
    { label: "Workflows", value: "8", icon: Workflow, color: "text-accent" },
    { label: "Executions Today", value: "247", icon: PlayCircle, color: "text-primary" },
    { label: "Success Rate", value: "98.5%", icon: TrendingUp, color: "text-accent" },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Monitor and manage your AI agent ecosystem</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="lg">
            <Activity className="w-4 h-4 mr-2" />
            View Logs
          </Button>
          <Link to="/workflows">
            <Button size="lg" className="bg-gradient-primary shadow-glow-primary">
              <Plus className="w-4 h-4 mr-2" />
              New Workflow
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6 bg-card border-border hover:border-primary/50 transition-all hover:shadow-glow-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
              </div>
              <div className={cn("w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center", stat.color)}>
                <stat.icon className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Agents</h3>
            <Link to="/agents">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>
          <div className="space-y-3">
            {[
              { name: "Data Analyzer", role: "Analyst", status: "active" },
              { name: "Content Writer", role: "Creator", status: "active" },
              { name: "Code Reviewer", role: "Developer", status: "idle" },
            ].map((agent) => (
              <div key={agent.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary border border-border hover:border-primary/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{agent.name}</p>
                    <p className="text-sm text-muted-foreground">{agent.role}</p>
                  </div>
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium",
                  agent.status === "active" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                )}>
                  {agent.status}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Active Workflows</h3>
            <Link to="/workflows">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>
          <div className="space-y-3">
            {[
              { name: "Content Pipeline", agents: 3, status: "running" },
              { name: "Data Processing", agents: 5, status: "running" },
              { name: "Report Generation", agents: 2, status: "completed" },
            ].map((workflow) => (
              <div key={workflow.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary border border-border hover:border-accent/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <Workflow className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{workflow.name}</p>
                    <p className="text-sm text-muted-foreground">{workflow.agents} agents</p>
                  </div>
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium",
                  workflow.status === "running" ? "bg-primary/20 text-primary" : "bg-accent/20 text-accent"
                )}>
                  {workflow.status}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: "Workflow completed", detail: "Content Pipeline finished successfully", time: "2 min ago", type: "success" },
            { action: "Agent created", detail: "New agent 'Email Responder' was configured", time: "15 min ago", type: "info" },
            { action: "Execution started", detail: "Data Processing workflow initiated", time: "1 hour ago", type: "info" },
          ].map((activity, idx) => (
            <div key={idx} className="flex items-start gap-3 pb-4 border-b border-border last:border-0">
              <div className={cn(
                "w-2 h-2 rounded-full mt-2",
                activity.type === "success" ? "bg-primary" : "bg-accent"
              )} />
              <div className="flex-1">
                <p className="font-medium text-foreground">{activity.action}</p>
                <p className="text-sm text-muted-foreground">{activity.detail}</p>
              </div>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
