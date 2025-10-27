import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save } from "lucide-react";

export default function Settings() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Configure your framework preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-card border border-border">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Framework Settings</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="project-name">Project Name</Label>
                <Input id="project-name" defaultValue="Agentic Studio" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="workspace">Workspace ID</Label>
                <Input id="workspace" defaultValue="ws_abc123" className="mt-1.5" disabled />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-save Workflows</Label>
                  <p className="text-sm text-muted-foreground">Automatically save workflow changes</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">API Keys</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="openai-key">OpenAI API Key</Label>
                <Input id="openai-key" type="password" placeholder="sk-..." className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="anthropic-key">Anthropic API Key</Label>
                <Input id="anthropic-key" type="password" placeholder="sk-ant-..." className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="google-key">Google AI API Key</Label>
                <Input id="google-key" type="password" placeholder="..." className="mt-1.5" />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Security & Access</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Require Authentication</Label>
                  <p className="text-sm text-muted-foreground">Enable user authentication for access</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Sandbox Execution</Label>
                  <p className="text-sm text-muted-foreground">Execute agents in isolated containers</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Audit Logging</Label>
                  <p className="text-sm text-muted-foreground">Log all agent actions and changes</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Advanced Configuration</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="max-agents">Max Concurrent Agents</Label>
                <Input id="max-agents" type="number" defaultValue="10" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="timeout">Execution Timeout (seconds)</Label>
                <Input id="timeout" type="number" defaultValue="300" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="memory-limit">Memory Limit (MB)</Label>
                <Input id="memory-limit" type="number" defaultValue="2048" className="mt-1.5" />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button className="bg-gradient-primary shadow-glow-primary">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
