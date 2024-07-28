import Konva from 'konva';

export type Node = {
  base64: (
    options?: Partial<{ x: number; y: number; pixelRatio: number }>
  ) => string;
};

export function convertNode(node: Konva.Node): Node {
  return {
    base64: options => node.toDataURL(options),
  };
}
