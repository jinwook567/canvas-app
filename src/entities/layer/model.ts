import Konva from 'konva';
import { NodeConfig, ControlConfig, ContainerElement } from 'shared/canvas';

export type LayerConfig<Child> = {
  type: 'layer';
  elements: Child[];
} & NodeConfig &
  ControlConfig;

export type LayerElement = ContainerElement;

export function elements<Child>(layer: LayerConfig<Child>) {
  return layer.elements;
}
