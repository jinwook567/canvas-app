import { KonvaNode, ImageNodeArg, NodeArg, StageSize } from '../types/editor';
import { createUniqueId } from './unit';

type PositionArg = {
  stageWidth: StageSize['width'];
  stageHeight: StageSize['height'];
  nodeWidth: NodeArg['width'];
  nodeHeight: NodeArg['height'];
};

export const getCenterPosition = ({
  stageWidth,
  stageHeight,
  nodeWidth,
  nodeHeight,
}: PositionArg) => {
  const x = stageWidth / 2 - nodeWidth / 2;
  const y = stageHeight / 2 - nodeHeight / 2;
  return { x, y };
};

export const getInitialPosition = ({
  stageWidth,
  stageHeight,
  nodeWidth,
  nodeHeight,
  ratio,
}: PositionArg & { ratio: number }) => {
  const width = stageWidth * ratio;
  const height = (width * nodeHeight) / nodeWidth;
  const { x, y } = getCenterPosition({
    stageWidth,
    stageHeight,
    nodeWidth: width,
    nodeHeight: height,
  });
  return { width, height, x, y };
};

const createImageNode = (node: ImageNodeArg) => ({
  width: node.width,
  height: node.height,
  url: node.url,
  type: 'image' as const,
  x: 0,
  y: 0,
});

export const createNode = (nodeArg: NodeArg): KonvaNode => {
  const id = createUniqueId();

  const node = createImageNode(nodeArg);
  return { ...node, id };
};
