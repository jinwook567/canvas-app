import { KonvaNode, ImageNodeArg, NodeArg } from '../types/editor';
import { createUniqueId } from './unit';

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

export default {};
