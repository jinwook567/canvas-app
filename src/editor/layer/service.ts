import { Node } from 'editor/node';

export type Layer = { visible?: boolean; lock?: boolean; shapes: [] };

export type LayerNode = Node;

export function shapes(layer: Layer) {
  return layer.shapes;
}

export function setShapes(shapes: Layer['shapes'], layer: Layer) {
  return { ...layer, shapes };
}
