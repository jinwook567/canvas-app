import { KonvaNode, ImageNodeArg, NodeArg, KonvaStages } from '../types/editor';
import { createUniqueId } from './unit';

const width = 500;
const height = 500;

const createImageNode = (node: ImageNodeArg) => ({
  width,
  height,
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

export default {};
