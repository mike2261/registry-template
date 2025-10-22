import { NodeProps, Position, Handle, useNodeConnections } from "@xyflow/react";

export type CustomNodeDataType = {
  content: string;
  color: string;
};

export const LabelNode = (props: NodeProps) => {
  const { data } = props;
  const { content, color } = data as CustomNodeDataType;
  return (
    <div
      className={`rounded-lg border-2 border-b-4 p-3 w-80`}
      style={{
        borderColor: color,
      }}
    >
      {content}
      <Handle
        type="source"
        position={Position.Right}
        className="!size-3"
        style={{
          background: color,
        }}
        data-color={color}
      />
    </div>
  );
};

export const DefinitionNode = (props: NodeProps) => {
  const { data } = props;
  const { content, color } = data as CustomNodeDataType;
  return (
    <div
      className={`rounded-lg border-2 border-b-4 p-3 w-100 border-gray-300`}
      style={{
        borderColor: color || "gray",
      }}
    >
      {content}
      <Handle
        type="target"
        position={Position.Left}
        className="!size-3 background-gray-300"
        isConnectableStart={false}
        style={{
          background: color || "gray",
        }}
      />
    </div>
  );
};
