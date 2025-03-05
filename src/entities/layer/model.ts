import { NodeConfig, NodeElement, ShapeConfig } from 'shared/canvas';

export type LayerConfig = {
  type: 'layer';
  visible?: boolean;
  lock?: boolean;
  shapes: ShapeConfig['id'][];
} & NodeConfig;

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

export function makeConfig(config: Omit<LayerConfig, 'type'>) {
  return { ...config, type: 'layer' };
}
