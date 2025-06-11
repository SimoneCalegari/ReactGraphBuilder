import React, { useState } from 'react';
import FileUploader from './components/FileUploader';
import GraphView from './components/GraphView';
import QueryViewer from './components/QueryViewer';

export default function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [queries, setQueries] = useState([]);

  const handleAddNodes = (newNodes) => {
    setNodes((nds) => [...nds, ...newNodes]);
  };

  const handleAddEdge = (edge, query) => {
    setEdges((eds) => [...eds, edge]);
    setQueries((qs) => [...qs, query]);
  };

  return (
    <div id="root">
      <FileUploader onNodesGenerated={handleAddNodes} />
      <GraphView nodes={nodes} edges={edges} onAddEdge={handleAddEdge} />
      <QueryViewer queries={queries} />
    </div>
  );
}
