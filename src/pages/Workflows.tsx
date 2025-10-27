import { useCallback } from 'react';
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
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from "@/components/ui/button";
import { Plus, Play, Save } from "lucide-react";

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

export default function Workflows() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Toolbar */}
      <div className="h-16 border-b border-border flex items-center justify-between px-6 bg-card">
        <div>
          <h1 className="text-xl font-bold text-foreground">Workflow Builder</h1>
          <p className="text-xs text-muted-foreground">Design agent orchestration flows</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Agent
          </Button>
          <Button variant="outline">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button className="bg-gradient-primary shadow-glow-primary">
            <Play className="w-4 h-4 mr-2" />
            Execute
          </Button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1" style={{ background: 'hsl(222 47% 8%)' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
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
    </div>
  );
}
