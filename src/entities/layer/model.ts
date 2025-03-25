import { NodeConfig, NodeElement, ControlConfig } from 'shared/canvas';

export type LayerConfig<Child> = {
  type: 'layer';
  elements: Child[];
} & NodeConfig &
  ControlConfig;

export type LayerElement = NodeElement;

export function elements<Child>(layer: LayerConfig<Child>) {
  return layer.elements;
}
