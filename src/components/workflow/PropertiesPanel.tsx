import { Node } from '@xyflow/react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Bot } from "lucide-react";

interface PropertiesPanelProps {
  selectedNode: Node | null;
  onNodeUpdate: (nodeId: string, data: any) => void;
}

export const PropertiesPanel = ({ selectedNode, onNodeUpdate }: PropertiesPanelProps) => {
  if (!selectedNode) {
    return (
      <div className="w-80 border-l border-border bg-sidebar p-6">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <Bot className="w-12 h-12 text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">Select a node to view properties</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 border-l border-border bg-sidebar p-4 overflow-y-auto">
      <h3 className="text-sm font-bold text-sidebar-foreground mb-4">Properties</h3>
      
      <Card className="p-4 space-y-4 bg-sidebar-accent/30 border-sidebar-border">
        <div>
          <Label className="text-xs text-muted-foreground">Node Type</Label>
          <p className="text-sm font-medium text-sidebar-foreground mt-1">{selectedNode.type || 'default'}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="node-label" className="text-xs">Label</Label>
          <Input
            id="node-label"
            value={(selectedNode.data.label as string) || ''}
            onChange={(e) => onNodeUpdate(selectedNode.id, { ...selectedNode.data, label: e.target.value })}
            className="bg-background border-sidebar-border"
          />
        </div>

        {(selectedNode.type === 'agent' || !selectedNode.type) && (
          <>
            <div className="space-y-2">
              <Label htmlFor="node-model" className="text-xs">Model</Label>
              <Select
                value={(selectedNode.data.model as string) || 'google/gemini-2.5-flash'}
                onValueChange={(value) => onNodeUpdate(selectedNode.id, { ...selectedNode.data, model: value })}
              >
                <SelectTrigger className="bg-background border-sidebar-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="google/gemini-2.5-flash">Gemini 2.5 Flash</SelectItem>
                  <SelectItem value="google/gemini-2.5-pro">Gemini 2.5 Pro</SelectItem>
                  <SelectItem value="openai/gpt-5">GPT-5</SelectItem>
                  <SelectItem value="openai/gpt-5-mini">GPT-5 Mini</SelectItem>
                  <SelectItem value="claude-sonnet-4-5">Claude Sonnet 4.5</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="node-role" className="text-xs">Role</Label>
              <Input
                id="node-role"
                value={(selectedNode.data.role as string) || ''}
                onChange={(e) => onNodeUpdate(selectedNode.id, { ...selectedNode.data, role: e.target.value })}
                placeholder="e.g., Analyzer, Writer, Reviewer"
                className="bg-background border-sidebar-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="node-prompt" className="text-xs">System Prompt</Label>
              <Textarea
                id="node-prompt"
                value={(selectedNode.data.prompt as string) || ''}
                onChange={(e) => onNodeUpdate(selectedNode.id, { ...selectedNode.data, prompt: e.target.value })}
                placeholder="Define the agent's behavior..."
                className="bg-background border-sidebar-border min-h-[100px]"
              />
            </div>
          </>
        )}

        {selectedNode.type === 'tool' && (
          <div className="space-y-2">
            <Label htmlFor="node-tool" className="text-xs">Tool Name</Label>
            <Input
              id="node-tool"
              value={(selectedNode.data.toolName as string) || ''}
              onChange={(e) => onNodeUpdate(selectedNode.id, { ...selectedNode.data, toolName: e.target.value })}
              placeholder="e.g., web_search, calculator"
              className="bg-background border-sidebar-border"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="node-description" className="text-xs">Description</Label>
          <Textarea
            id="node-description"
            value={(selectedNode.data.description as string) || ''}
            onChange={(e) => onNodeUpdate(selectedNode.id, { ...selectedNode.data, description: e.target.value })}
            placeholder="Describe this node's purpose..."
            className="bg-background border-sidebar-border"
          />
        </div>
      </Card>
    </div>
  );
};
