import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

export default function GraphView({ nodes: initialNodes, edges: initialEdges, onAddEdge }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => {
      const newEdge = { ...params, id: `${params.source}-${params.target}` };
      const query = \`MATCH (a), (b) WHERE id(a) = '\${params.source}' AND id(b) = '\${params.target}' CREATE (a)-[:RELATION]->(b);\`;
      setEdges((eds) => addEdge(newEdge, eds));
      onAddEdge(newEdge, query);
    },
    [onAddEdge, setEdges]
  );

  return (
    <div style={{ width: '100%', height: '70vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
