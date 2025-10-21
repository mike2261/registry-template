"use client";

import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { LineMatchingNode } from "./line-matching-node";
import { useState } from "react";

const initialNodes = [
  {
    id: "node-1",
    type: "lineMatchingNode",
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
];

const nodeTypes = {
  lineMatchingNode: LineMatchingNode,
};

export const LineMatchingGame = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);

  return (
    <div className="h-100 w-full">
      <ReactFlow nodeTypes={nodeTypes} nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};
