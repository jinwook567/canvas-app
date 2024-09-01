import Konva from 'konva';

export type NodeElement = {
  base64: (
    options?: Partial<{ x: number; y: number; pixelRatio: number }>
  ) => string;
};

export function toNodeElement(node: Konva.Node): NodeElement {
  return {
    base64: options => node.toDataURL(options),
  };
}
