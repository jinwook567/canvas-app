import {
  NodeConfig,
  NodeElement,
  ControlConfig,
  ShapeConfig,
} from 'shared/canvas';

export type LayerConfig<Child extends ShapeConfig> = {
  type: 'layer';
  shapes: Child[];
} & NodeConfig &
  ControlConfig;

export type LayerElement = NodeElement;

export function shapes<Child extends ShapeConfig>(layer: LayerConfig<Child>) {
  return layer.shapes;
}
