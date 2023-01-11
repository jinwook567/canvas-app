import { initialImageStageRatio } from '../constants/editor';
import {
  KonvaNode,
  ImageNodeArg,
  NodeArg,
  StageSize,
  KonvaStage,
  GroupNodeArg,
} from '../types/editor';
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

const createImageNode = (nodeArg: ImageNodeArg) => ({
  width: nodeArg.width,
  height: nodeArg.height,
  url: nodeArg.url,
  type: 'image' as const,
  scaleX: 1,
  scaleY: 1,
});

export const createGroupNode = (nodeArg: GroupNodeArg) => ({
  type: 'group' as const,
  scaleX: 1,
  scaleY: 1,
  children: nodeArg.children,
  x: 0,
  y: 0,
  id: createUniqueId(),
});

export const createNode = ({
  nodeArg,
  stageSize,
}: {
  nodeArg: NodeArg;
  stageSize: StageSize;
}): KonvaNode => {
  const id = createUniqueId();

  const node = createImageNode(nodeArg);

  const { x, y, width, height } = getInitialPosition({
    stageSize,
    nodeSize: {
      width: nodeArg.width,
      height: nodeArg.height,
    },
    ratio: initialImageStageRatio,
  });
  return { ...node, id, x, y, width, height };
};

export const findSameShapeNode = ({
  currentStage,
  node,
}: {
  currentStage: KonvaStage;
  node: KonvaNode;
}) =>
  currentStage.find(
    ({ x, y, width, height, type }) =>
      x === node.x &&
      y === node.y &&
      width === node.width &&
      height === node.height &&
      type === node.type
  );

export const arrangeSameShapeNode = ({
  currentStage,
  node,
}: {
  currentStage: KonvaStage;
  node: KonvaNode;
}): KonvaNode => {
  const sameShapeNode = findSameShapeNode({ currentStage, node });
  if (!sameShapeNode) return node;
  return arrangeSameShapeNode({
    currentStage,
    node: {
      ...node,
      x: sameShapeNode.x + 15,
      y: sameShapeNode.y + 15,
    },
  });
};
