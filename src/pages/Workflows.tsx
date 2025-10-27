import { useCallback, useState, useRef, DragEvent } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  MarkerType,
  ReactFlowProvider,
  ReactFlowInstance,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from "@/components/ui/button";
import { Plus, Play, Save, Download, Upload } from "lucide-react";
import { NodePalette } from "@/components/workflow/NodePalette";
import { PropertiesPanel } from "@/components/workflow/PropertiesPanel";
import { FrameworkSelector } from "@/components/workflow/FrameworkSelector";
import { useToast } from "@/hooks/use-toast";

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Start: User Request' },
    position: { x: 250, y: 50 },
    style: {
      background: 'hsl(217 91% 60%)',
      color: 'white',
      border: '1px solid hsl(217 91% 60%)',
      borderRadius: '12px',
      padding: '16px',
      fontWeight: 600,
    },
  },
  {
    id: '2',
    data: { label: 'Agent: Analyzer' },
    position: { x: 250, y: 150 },
    style: {
      background: 'hsl(222 47% 11%)',
      color: 'white',
      border: '1px solid hsl(217 33% 20%)',
      borderRadius: '12px',
      padding: '16px',
    },
  },
  {
    id: '3',
    data: { label: 'Agent: Writer' },
    position: { x: 100, y: 280 },
    style: {
      background: 'hsl(222 47% 11%)',
      color: 'white',
      border: '1px solid hsl(217 33% 20%)',
      borderRadius: '12px',
      padding: '16px',
    },
  },
  {
    id: '4',
    data: { label: 'Agent: Reviewer' },
    position: { x: 400, y: 280 },
    style: {
      background: 'hsl(222 47% 11%)',
      color: 'white',
      border: '1px solid hsl(217 33% 20%)',
      borderRadius: '12px',
      padding: '16px',
    },
  },
  {
    id: '5',
    type: 'output',
    data: { label: 'End: Response' },
    position: { x: 250, y: 410 },
    style: {
      background: 'hsl(271 91% 65%)',
      color: 'white',
      border: '1px solid hsl(271 91% 65%)',
      borderRadius: '12px',
      padding: '16px',
      fontWeight: 600,
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'smoothstep',
    animated: true,
    style: { stroke: 'hsl(217 91% 60%)', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: 'hsl(217 91% 60%)' },
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    type: 'smoothstep',
    animated: true,
    style: { stroke: 'hsl(217 91% 60%)', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: 'hsl(217 91% 60%)' },
  },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
    type: 'smoothstep',
    animated: true,
    style: { stroke: 'hsl(217 91% 60%)', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: 'hsl(217 91% 60%)' },
  },
  {
    id: 'e3-5',
    source: '3',
    target: '5',
    type: 'smoothstep',
    animated: true,
    style: { stroke: 'hsl(217 91% 60%)', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: 'hsl(217 91% 60%)' },
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    type: 'smoothstep',
    animated: true,
    style: { stroke: 'hsl(217 91% 60%)', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: 'hsl(217 91% 60%)' },
  },
];

function WorkflowsInner() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedFramework, setSelectedFramework] = useState<string>('langgraph');
  const [showFrameworkSelector, setShowFrameworkSelector] = useState(false);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge({
        ...params,
        type: 'smoothstep',
        animated: true,
        style: { stroke: 'hsl(217 91% 60%)', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: 'hsl(217 91% 60%)' },
      }, eds));
    },
    [setEdges]
  );

  const onNodeClick = useCallback((_: any, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onNodeUpdate = useCallback((nodeId: string, data: any) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data };
        }
        return node;
      })
    );
  }, [setNodes]);

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      if (!reactFlowInstance || !reactFlowWrapper.current) return;

      const nodeData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: `${nodeData.type}-${Date.now()}`,
        type: nodeData.type,
        position,
        data: { label: nodeData.label },
        style: {
          background: 'hsl(222 47% 11%)',
          color: 'white',
          border: '1px solid hsl(217 33% 20%)',
          borderRadius: '12px',
          padding: '16px',
        },
      };

      setNodes((nds) => nds.concat(newNode));
      toast({
        title: "Node Added",
        description: `${nodeData.label} has been added to the workflow`,
      });
    },
    [reactFlowInstance, setNodes, toast]
  );

  const handleSave = useCallback(() => {
    const workflow = { nodes, edges, framework: selectedFramework };
    const dataStr = JSON.stringify(workflow, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `workflow-${Date.now()}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    toast({
      title: "Workflow Saved",
      description: "Your workflow has been exported successfully",
    });
  }, [nodes, edges, selectedFramework, toast]);

  const handleExecute = useCallback(() => {
    toast({
      title: "Executing Workflow",
      description: `Running workflow with ${selectedFramework} framework...`,
    });
  }, [selectedFramework, toast]);

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Toolbar */}
      <div className="h-16 border-b border-border flex items-center justify-between px-6 bg-card">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl font-bold text-foreground">No-Code Workflow Studio</h1>
            <p className="text-xs text-muted-foreground">
              Framework: <span className="font-medium text-primary">{selectedFramework.toUpperCase()}</span>
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowFrameworkSelector(!showFrameworkSelector)}
          >
            Change Framework
          </Button>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button className="bg-gradient-primary shadow-glow-primary" size="sm" onClick={handleExecute}>
            <Play className="w-4 h-4 mr-2" />
            Execute
          </Button>
        </div>
      </div>

      {/* Framework Selector Modal */}
      {showFrameworkSelector && (
        <div className="border-b border-border bg-sidebar">
          <FrameworkSelector
            selectedFramework={selectedFramework}
            onSelectFramework={(id) => {
              setSelectedFramework(id);
              setShowFrameworkSelector(false);
              toast({
                title: "Framework Changed",
                description: `Now using ${id.toUpperCase()} framework`,
              });
            }}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Node Palette */}
        <NodePalette />

        {/* Canvas */}
        <div 
          ref={reactFlowWrapper}
          className="flex-1" 
          style={{ background: 'hsl(222 47% 8%)' }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Background color="hsl(217 33% 20%)" gap={16} />
            <Controls 
              style={{ 
                background: 'hsl(222 47% 11%)',
                border: '1px solid hsl(217 33% 20%)',
                borderRadius: '12px',
              }}
            />
            <MiniMap 
              style={{ 
                background: 'hsl(222 47% 11%)',
                border: '1px solid hsl(217 33% 20%)',
                borderRadius: '12px',
              }}
              nodeColor={(node) => {
                if (node.type === 'input') return 'hsl(217 91% 60%)';
                if (node.type === 'output') return 'hsl(271 91% 65%)';
                return 'hsl(222 47% 15%)';
              }}
            />
          </ReactFlow>
        </div>

        {/* Properties Panel */}
        <PropertiesPanel 
          selectedNode={selectedNode}
          onNodeUpdate={onNodeUpdate}
        />
      </div>
    </div>
  );
}

export default function Workflows() {
  return (
    <ReactFlowProvider>
      <WorkflowsInner />
    </ReactFlowProvider>
  );
}
