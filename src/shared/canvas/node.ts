import Konva from 'konva';

export type NodeConfig = {
  id: string;
};

export function id(config: NodeConfig) {
  return config.id;
}

export type NodeElement = {
  base64: (
    options?: Partial<{ x: number; y: number; pixelRatio: number }>
  ) => string;
  _raw: Konva.Node;
};

export function toNodeElement(node: Konva.Node): NodeElement {
  return {
    base64: options => node.toDataURL(options),
    _raw: node,
  };
}
