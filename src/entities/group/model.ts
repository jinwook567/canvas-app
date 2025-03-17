import {
  NodeConfig,
  NodeElement,
  ShapeConfig,
  TransformConfig,
} from 'shared/canvas';

export type GroupConfig<Child extends ShapeConfig> = {
  type: 'group';
  shapes: Child[];
} & NodeConfig &
  TransformConfig;

export type GroupElement = NodeElement;

export function shapes<Child extends ShapeConfig>(config: GroupConfig<Child>) {
  return config.shapes;
}

export function isGroup<Child extends ShapeConfig>(config: {
  type: string;
}): config is GroupConfig<Child> {
  return config.type === 'group';
}
