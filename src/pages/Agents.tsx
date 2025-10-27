import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Plus, Search, Settings, Trash2, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Agent {
  id: string;
  name: string;
  role: string;
  model: string;
  status: "active" | "idle" | "error";
  description: string;
}

export default function Agents() {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: "1",
      name: "Data Analyzer",
      role: "Analyst",
      model: "gpt-4",
      status: "active",
      description: "Analyzes data patterns and generates insights"
    },
    {
      id: "2",
      name: "Content Writer",
      role: "Creator",
      model: "gpt-4",
      status: "active",
      description: "Creates engaging content and marketing copy"
    },
    {
      id: "3",
      name: "Code Reviewer",
      role: "Developer",
      model: "gpt-4",
      status: "idle",
      description: "Reviews code quality and suggests improvements"
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newAgent, setNewAgent] = useState({
    name: "",
    role: "",
    model: "gpt-4",
    description: ""
  });

  const handleCreateAgent = () => {
    const agent: Agent = {
      id: Date.now().toString(),
      ...newAgent,
      status: "idle"
    };
    setAgents([...agents, agent]);
    setIsCreateOpen(false);
    setNewAgent({ name: "", role: "", model: "gpt-4", description: "" });
  };

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Agent Management</h1>
          <p className="text-muted-foreground mt-1">Create and configure your AI agents</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="bg-gradient-primary shadow-glow-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create Agent
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Create New Agent</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="name">Agent Name</Label>
                <Input
                  id="name"
                  value={newAgent.name}
                  onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                  placeholder="e.g., Research Assistant"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={newAgent.role}
                  onChange={(e) => setNewAgent({ ...newAgent, role: e.target.value })}
                  placeholder="e.g., Researcher"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="model">Model</Label>
                <Select value={newAgent.model} onValueChange={(value) => setNewAgent({ ...newAgent, model: value })}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4">GPT-4</SelectItem>
                    <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                    <SelectItem value="claude-3">Claude 3</SelectItem>
                    <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newAgent.description}
                  onChange={(e) => setNewAgent({ ...newAgent, description: e.target.value })}
                  placeholder="Describe what this agent does..."
                  className="mt-1.5"
                  rows={3}
                />
              </div>
              <Button onClick={handleCreateAgent} className="w-full bg-gradient-primary">
                Create Agent
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search agents..."
          className="pl-10"
        />
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <Card key={agent.id} className="p-6 bg-card border-border hover:border-primary/50 transition-all hover:shadow-glow-primary">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow-primary">
                <Bot className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                agent.status === "active" ? "bg-primary/20 text-primary" :
                agent.status === "idle" ? "bg-muted text-muted-foreground" :
                "bg-destructive/20 text-destructive"
              }`}>
                {agent.status}
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-foreground mb-1">{agent.name}</h3>
            <p className="text-sm text-primary mb-2">{agent.role}</p>
            <p className="text-sm text-muted-foreground mb-4">{agent.description}</p>
            
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">Model: {agent.model}</p>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
