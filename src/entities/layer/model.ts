import { NodeConfig, NodeElement } from 'entities/node/model';
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

export function visible(layer: LayerConfig) {
  return layer.visible ?? true;
}

export function lock(layer: LayerConfig) {
  return layer.lock ?? false;
}

export function shapes(layer: LayerConfig) {
  return layer.shapes;
}

export function makeConfig(config: LayerConfig) {
  return { ...config };
}
