import { NodeElement } from 'editor/node';
import { ShapePackageConfig } from 'editor/shape/service';

export type LayerConfig = {
  visible?: boolean;
  lock?: boolean;
  shapes: ShapePackageConfig[];
};

export type LayerElement = NodeElement;

export function shapes(layer: LayerConfig) {
  return layer.shapes;
}

export function setShapes(shapes: LayerConfig['shapes'], layer: LayerConfig) {
  return { ...layer, shapes };
}
