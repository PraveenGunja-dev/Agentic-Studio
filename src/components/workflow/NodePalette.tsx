import { Bot, Database, Code, Workflow, MessageSquare, FileText, CheckCircle, XCircle, GitBranch } from "lucide-react";
import { Card } from "@/components/ui/card";

const nodeTypes = [
  { type: 'agent', label: 'AI Agent', icon: Bot, color: 'hsl(217 91% 60%)' },
  { type: 'tool', label: 'Tool Call', icon: Code, color: 'hsl(142 76% 36%)' },
  { type: 'database', label: 'Database', icon: Database, color: 'hsl(271 91% 65%)' },
  { type: 'decision', label: 'Decision', icon: GitBranch, color: 'hsl(48 96% 53%)' },
  { type: 'human', label: 'Human Input', icon: MessageSquare, color: 'hsl(24 100% 50%)' },
  { type: 'document', label: 'Document', icon: FileText, color: 'hsl(199 89% 48%)' },
  { type: 'success', label: 'Success', icon: CheckCircle, color: 'hsl(142 76% 36%)' },
  { type: 'error', label: 'Error Handler', icon: XCircle, color: 'hsl(0 84% 60%)' },
];

export const NodePalette = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string, label: string) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ type: nodeType, label }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-64 border-r border-border bg-sidebar p-4 overflow-y-auto">
      <h3 className="text-sm font-bold text-sidebar-foreground mb-4">Node Palette</h3>
      <div className="space-y-2">
        {nodeTypes.map((node) => (
          <Card
            key={node.type}
            draggable
            onDragStart={(e) => onDragStart(e, node.type, node.label)}
            className="p-3 cursor-grab active:cursor-grabbing hover:bg-sidebar-accent/50 transition-all border-sidebar-border bg-sidebar-accent/30"
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: node.color }}
              >
                <node.icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-sidebar-foreground">{node.label}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
