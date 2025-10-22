import { colors } from "./constants";
import { Edge, Node } from "@xyflow/react";

export const createRandomPositionIndex = (n: number): number[] => {
  if (n === 0) return [];
  const indices = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
};

export const initNodes = (data: { label: string; definition: string }[]) => {
  const result: Node[] = [];
  const totalPairs = data.length;
  const defPositionIndices = createRandomPositionIndex(totalPairs);

  data.forEach((item, index) => {
    const color = colors[index % colors.length].color;
    result.push({
      id: `label-${index}`,
      type: "labelNode",
      position: { x: -200, y: index * 100 },
      data: { content: item.label, color },
      draggable: false,
    });
    const defYIndex = defPositionIndices[index];
    result.push({
      id: `definition-${defYIndex}`,
      type: "definitionNode",
      position: { x: 200, y: defYIndex * 100 },
      data: { content: item.definition },
      draggable: false,
    });
  });

  return result;
};

export const checkCorrectConnection = (
  nodes: Node[],
  edges: Edge[],
  data: { label: string; definition: string }[]
): { isCorrect: boolean; correctCount: number; totalCount: number } => {
  let correctCount = 0;
  const totalCount = edges.length;

  edges.forEach((edge) => {
    const { source, target } = edge;

    // Extract index from source (label-0, label-1, etc.)
    const labelIndex = parseInt(source.replace("label-", ""));

    // Extract index from target (definition-0, definition-1, etc.)
    const definitionIndex = parseInt(target.replace("definition-", ""));

    // Check if this connection matches the original data
    // The label at labelIndex should match the definition at definitionIndex
    if (
      labelIndex >= 0 &&
      labelIndex < data.length &&
      definitionIndex >= 0 &&
      definitionIndex < data.length &&
      labelIndex === definitionIndex
    ) {
      correctCount++;
    }
  });

  return {
    isCorrect: correctCount === data.length && totalCount === data.length,
    correctCount,
    totalCount,
  };
};
