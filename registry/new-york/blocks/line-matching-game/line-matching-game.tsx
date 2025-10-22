"use client";

import {
  ReactFlow,
  Background,
  Controls,
  Connection,
  addEdge,
  getConnectedEdges,
  Edge,
  reconnectEdge,
  OnConnectStartParams,
  Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { DefinitionNode, LabelNode, CustomNodeDataType } from "./custom-node";
import { useCallback, useEffect, useState } from "react";
import { initNodes } from "./utils";
import { DATA } from "./constants";
import { CustomColorEdge } from "./custom-edge";
import { GameControll } from "./game-controll";

const nodeTypes = {
  labelNode: LabelNode,
  definitionNode: DefinitionNode,
};

const edgeTypes = {
  customColorEdge: CustomColorEdge,
};

export const LineMatchingGame = () => {
  const [nodes, setNodes] = useState<Node[]>(() => {
    return initNodes(DATA);
  });
  const [edges, setEdges] = useState<Edge[]>([]);

  const onConnect = (connection: Connection) => {
    const { source, target } = connection;
    const targetNode = nodes.find((node) => node.id === target);
    const sourceNode = nodes.find(
      (node) => node.id === source
    ) as Node<CustomNodeDataType>;
    if (!sourceNode || !targetNode) return;

    const color = sourceNode.data.color;
    const targetNodeElement = document.querySelector(
      `[data-id='${targetNode.id}']`
    ) as HTMLElement;
    if (!targetNodeElement) return;
    console.log("targetNodeElement", targetNodeElement);
    targetNodeElement.style.setProperty("border-color", color);

    const connectedEdges = getConnectedEdges([sourceNode, targetNode], edges);
    setEdges((eds) =>
      addEdge(connection, eds).filter((edge) => !connectedEdges.includes(edge))
    );
    setNodes((nds) => nds.map((node) => ({ ...node })));
  };

  const onReconnect = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
    },
    []
  );

  const checkAnswers = () => {
    edges.forEach((edge) => {
      const sourceNode = nodes.find((node) => node.id === edge.source);
      const targetNode = nodes.find((node) => node.id === edge.target);
      if (!sourceNode || !targetNode) return;
    });
  };

  return (
    <div className="w-full">
      <div className="h-200 w-full">
        <ReactFlow
          className="w-full"
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          onReconnect={onReconnect}
          fitView
          panOnDrag={false}
          panOnScroll={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
        >
          <Controls />
        </ReactFlow>
      </div>
      <GameControll checkAnswers={checkAnswers} reset={() => {}} />
    </div>
  );
};
