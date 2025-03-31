import {
  ContainerElement,
  ControlConfig,
  NodeConfig,
  TransformConfig,
} from 'shared/canvas';

export type GroupConfig<Child> = {
  type: 'group';
  elements: Child[];
} & NodeConfig &
  TransformConfig &
  ControlConfig;

export type GroupElement = ContainerElement;

export function elements<Child>(config: GroupConfig<Child>) {
  return config.elements;
}

export function isGroup<Child>(config: {
  type: string;
}): config is GroupConfig<Child> {
  return config.type === 'group';
}
