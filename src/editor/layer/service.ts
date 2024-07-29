import { NodeElement } from 'editor/node';

export type LayerConfig = { visible?: boolean; lock?: boolean; shapes: [] };

export type LayerElement = NodeElement;

export function shapes(layer: LayerConfig) {
  return layer.shapes;
}

export function setShapes(shapes: LayerConfig['shapes'], layer: LayerConfig) {
  return { ...layer, shapes };
}
