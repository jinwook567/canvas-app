import { NodeElement } from 'entities/canvas/node/model';
import { PackageConfig } from 'entities/canvas/shape/plugin/package';

export type LayerConfig = {
  visible?: boolean;
  lock?: boolean;
  shapes: PackageConfig[];
};

export type LayerElement = NodeElement;

export function shapes(layer: LayerConfig) {
  return layer.shapes;
}

export function setShapes(shapes: LayerConfig['shapes'], layer: LayerConfig) {
  return { ...layer, shapes };
}
