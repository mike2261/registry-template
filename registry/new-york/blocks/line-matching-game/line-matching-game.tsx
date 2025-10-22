"use client";

import {
  ReactFlow,
  Controls,
  Connection,
  addEdge,
  getConnectedEdges,
  Edge,
  reconnectEdge,
  Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { DefinitionNode, LabelNode, CustomNodeDataType } from "./custom-node";
import { useCallback, useState } from "react";
import { initNodes, checkCorrectConnection } from "./utils";
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
  const [result, setResult] = useState<{
    isCorrect: boolean;
    correctCount: number;
    totalCount: number;
  } | null>(null);

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
    const checkResult = checkCorrectConnection(nodes, edges, DATA);
    setResult(checkResult);

    // Visual feedback for correct/incorrect connections
    edges.forEach((edge) => {
      const labelIndex = parseInt(edge.source.replace("label-", ""));
      const definitionIndex = parseInt(edge.target.replace("definition-", ""));
      const isCorrect = labelIndex === definitionIndex;

      const targetNodeElement = document.querySelector(
        `[data-id='${edge.target}']`
      ) as HTMLElement;

      if (targetNodeElement) {
        // Add visual feedback based on correctness
        if (isCorrect) {
          targetNodeElement.style.setProperty("border-color", "green");
        } else {
          targetNodeElement.style.setProperty("border-color", "red");
        }
      }
    });

    return checkResult;
  };

  const reset = () => {
    setNodes(initNodes(DATA));
    setEdges([]);
    setResult(null);
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
      <GameControll checkAnswers={checkAnswers} reset={reset} result={result} />
    </div>
  );
};
