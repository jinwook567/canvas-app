import { initialImageStageRatio } from '../constants/editor';
import {
  KonvaNode,
  ImageNodeArg,
  NodeArg,
  StageSize,
  KonvaStage,
  GroupNodeArg,
  TextNodeArg,
} from '../types/editor';
import { createUniqueId, omit } from './unit';

type PositionArg = {
  stageSize: {
    width: StageSize['width'];
    height: StageSize['height'];
  };
  nodeSize: {
    width: number;
    height: number;
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

const createTextNode = (nodeArg: TextNodeArg) => ({
  type: 'text' as const,
  scaleX: 1,
  scaleY: 1,
  text: nodeArg.text,
  fontFamily: nodeArg.fontFamily,
  fontSize: nodeArg.fontSize,
  width: nodeArg.text.length * nodeArg.fontSize,
  height: nodeArg.fontSize,
  align: 'center' as const,
  verticalAlign: 'top' as const,
});

export const createNode = ({
  nodeArg,
  stageSize,
}: {
  nodeArg: NodeArg;
  stageSize: StageSize;
}): KonvaNode => {
  const id = createUniqueId();

  const node =
    nodeArg.type === 'text'
      ? createTextNode(nodeArg)
      : createImageNode(nodeArg);

  const { x, y, width, height } = getInitialPosition({
    stageSize,
    nodeSize: {
      width: node.width,
      height: node.height,
    },
    ratio: initialImageStageRatio,
  });

  return node.type === 'text'
    ? { ...omit(node, 'width', 'height'), id, x, y }
    : { ...node, id, x, y, width, height };
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
