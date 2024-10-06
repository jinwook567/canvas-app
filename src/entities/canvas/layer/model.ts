import { NodeConfig, NodeElement } from 'entities/canvas/node/model';
import { ShapeConfig } from 'entities/canvas/shape/core/model';

export type LayerConfig = {
  visible?: boolean;
  lock?: boolean;
  shapes: ShapeConfig['id'][];
} & NodeConfig;

export type Layers = {
  [key: LayerConfig['id']]: LayerConfig;
};

export type LayerElement = NodeElement;

export function setShapes(shapes: LayerConfig['shapes'], layer: LayerConfig) {
  return { ...layer, shapes };
}
