import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, CheckCircle, XCircle, Clock, Eye } from "lucide-react";

export default function Executions() {
  const executions = [
    {
      id: "exec_001",
      workflow: "Content Pipeline",
      status: "completed",
      duration: "2m 34s",
      startTime: "10:45 AM",
      agents: 3,
    },
    {
      id: "exec_002",
      workflow: "Data Processing",
      status: "running",
      duration: "1m 12s",
      startTime: "10:48 AM",
      agents: 5,
    },
    {
      id: "exec_003",
      workflow: "Report Generation",
      status: "failed",
      duration: "0m 45s",
      startTime: "10:40 AM",
      agents: 2,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-primary" />;
      case "running":
        return <PlayCircle className="w-5 h-5 text-accent animate-pulse" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-primary/20 text-primary";
      case "running":
        return "bg-accent/20 text-accent";
      case "failed":
        return "bg-destructive/20 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Execution Monitor</h1>
        <p className="text-muted-foreground mt-1">Track workflow runs and agent performance</p>
      </div>

      {/* Execution List */}
      <div className="space-y-4">
        {executions.map((execution) => (
          <Card key={execution.id} className="p-6 bg-card border-border hover:border-primary/50 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-primary">
                  {getStatusIcon(execution.status)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{execution.workflow}</h3>
                  <p className="text-sm text-muted-foreground">
                    ID: {execution.id} • Started at {execution.startTime}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium text-foreground">{execution.duration}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Agents</p>
                  <p className="font-medium text-foreground">{execution.agents}</p>
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(execution.status)}`}>
                  {execution.status}
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-primary" />
            <div>
              <p className="text-2xl font-bold text-foreground">247</p>
              <p className="text-sm text-muted-foreground">Completed Today</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-3">
            <PlayCircle className="w-8 h-8 text-accent" />
            <div>
              <p className="text-2xl font-bold text-foreground">5</p>
              <p className="text-sm text-muted-foreground">Currently Running</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-3">
            <XCircle className="w-8 h-8 text-destructive" />
            <div>
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-sm text-muted-foreground">Failed</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
