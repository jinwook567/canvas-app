import {
  defaultGroupConfig,
  defaultImageConfig,
  defaultTextConfig,
  initialImageStageRatio,
} from '../constants/editor';
import {
  KonvaNodeConfig,
  KonvaImageConfigArg,
  NodeArg,
  StageSize,
  KonvaStage,
  KonvaGroupConfigArg,
  KonvaTextConfigArg,
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

const createImageConfig = (nodeArg: KonvaImageConfigArg) => ({
  ...nodeArg,
  ...defaultImageConfig,
  id: createUniqueId(),
});

const createTextConfig = (nodeArg: KonvaTextConfigArg) => ({
  ...nodeArg,
  ...defaultTextConfig,
  width:
    nodeArg.fontSize *
    nodeArg.text
      .split('\n')
      .reduce((acc, cols) => Math.max(acc, cols.length), 0),
  height: nodeArg.fontSize * nodeArg.text.split('\n').length,
});

export const createNodeConfig = ({
  nodeArg,
  stageSize,
}: {
  nodeArg: NodeArg;
  stageSize: StageSize;
}): KonvaNodeConfig => {
  const id = createUniqueId();

  const node =
    nodeArg.type === 'text'
      ? createTextConfig(nodeArg)
      : createImageConfig(nodeArg);

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

export const createGroupConfig = (nodeArg: KonvaGroupConfigArg) => ({
  ...nodeArg,
  ...defaultGroupConfig,
  id: createUniqueId(),
  type: 'group' as const,
});

export const findSameShapeNode = ({
  currentStage,
  nodeConfig,
}: {
  currentStage: KonvaStage;
  nodeConfig: KonvaNodeConfig;
}) =>
  currentStage.find(
    ({ x, y, width, height, type }) =>
      x === nodeConfig.x &&
      y === nodeConfig.y &&
      width === nodeConfig.width &&
      height === nodeConfig.height &&
      type === nodeConfig.type
  );

export const arrangeSameShapeNode = ({
  currentStage,
  nodeConfig,
}: {
  currentStage: KonvaStage;
  nodeConfig: KonvaNodeConfig;
}): KonvaNodeConfig => {
  const sameShapeNode = findSameShapeNode({ currentStage, nodeConfig });
  if (!sameShapeNode) return nodeConfig;
  return arrangeSameShapeNode({
    currentStage,
    nodeConfig: {
      ...nodeConfig,
      x: sameShapeNode.x + 15,
      y: sameShapeNode.y + 15,
    },
  });
};

export const applyScaleToNode = ({
  node,
  scale,
}: {
  node: KonvaNodeConfig;
  scale: number;
}) => ({
  ...node,
  scaleX: node.scaleX * scale,
  scaleY: node.scaleY * scale,
  x: node.x * scale,
  y: node.y * scale,
});

export const getRatio = (size: StageSize) => size.width / size.height;

export const getScale = (size1: StageSize, size2: StageSize) => {
  const size1Ratio = getRatio(size1);
  const size2Ratio = getRatio(size2);

  if (size1Ratio > size2Ratio) {
    return size2.width / size1.width;
  }
  return size2.height / size1.height;
};
