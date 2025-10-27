import { Card } from "@/components/ui/card";
import { Network, Users, Workflow, Boxes } from "lucide-react";

const frameworks = [
  {
    id: 'langgraph',
    name: 'LangGraph',
    icon: Network,
    description: 'Build stateful multi-agent workflows',
    color: 'hsl(217 91% 60%)'
  },
  {
    id: 'crewai',
    name: 'CrewAI',
    icon: Users,
    description: 'Role-based agent collaboration',
    color: 'hsl(271 91% 65%)'
  },
  {
    id: 'autogen',
    name: 'AutoGen',
    icon: Workflow,
    description: 'Conversational agent framework',
    color: 'hsl(142 76% 36%)'
  },
  {
    id: 'semantic',
    name: 'Semantic Kernel',
    icon: Boxes,
    description: 'Enterprise AI orchestration',
    color: 'hsl(48 96% 53%)'
  },
];

interface FrameworkSelectorProps {
  selectedFramework: string;
  onSelectFramework: (id: string) => void;
}

export const FrameworkSelector = ({ selectedFramework, onSelectFramework }: FrameworkSelectorProps) => {
  return (
    <div className="grid grid-cols-4 gap-4 p-6">
      {frameworks.map((framework) => {
        const Icon = framework.icon;
        const isSelected = selectedFramework === framework.id;
        
        return (
          <Card
            key={framework.id}
            onClick={() => onSelectFramework(framework.id)}
            className={`p-6 cursor-pointer transition-all border-2 ${
              isSelected
                ? 'border-primary bg-sidebar-accent shadow-glow-primary'
                : 'border-sidebar-border bg-sidebar-accent/30 hover:bg-sidebar-accent/50'
            }`}
          >
            <div className="flex flex-col items-center text-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: framework.color }}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sidebar-foreground">{framework.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{framework.description}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
