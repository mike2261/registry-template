"use client";

import { colors } from "./constants";

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
  const result: any[] = [];
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

const checkCorrectConnection = () => {
  // Check if the current connection is correct
};
