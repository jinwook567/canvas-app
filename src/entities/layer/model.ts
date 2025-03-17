import { NodeConfig, NodeElement, ControlConfig } from 'shared/canvas';

export type LayerConfig<Child> = {
  type: 'layer';
  shapes: Child[];
} & NodeConfig &
  ControlConfig;

export type LayerElement = NodeElement;

export function shapes<Child>(layer: LayerConfig<Child>) {
  return layer.shapes;
}
