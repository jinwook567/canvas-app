import { KonvaNode, ImageNodeArg, NodeArg, StageSize } from '../types/editor';
import { createUniqueId } from './unit';

type PositionArg = {
  stageSize: {
    width: StageSize['width'];
    height: StageSize['height'];
  };
  nodeSize: {
    width: NodeArg['width'];
    height: NodeArg['height'];
  };
};

export const getCenterPosition = ({ stageSize, nodeSize }: PositionArg) => {
  const x = stageSize.width / 2 - nodeSize.width / 2;
  const y = stageSize.height / 2 - nodeSize.height / 2;
  return { x, y };
};

export const getInitialPosition = ({
  stageSize,
  nodeSize,
  ratio,
}: PositionArg & { ratio: number }) => {
  const width = stageSize.width * ratio;
  const height = (width * nodeSize.height) / nodeSize.width;
  const { x, y } = getCenterPosition({
    stageSize,
    nodeSize: {
      width,
      height,
    },
  });
  return { width, height, x, y };
};

const createImageNode = (node: ImageNodeArg) => ({
  width: node.width,
  height: node.height,
  url: node.url,
  type: 'image' as const,
  x: node.x,
  y: node.y,
});

export const createNode = (nodeArg: NodeArg): KonvaNode => {
  const id = createUniqueId();

  const node = createImageNode(nodeArg);
  return { ...node, id };
};
