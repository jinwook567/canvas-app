import { NodeConfig, NodeElement, TransformConfig } from 'shared/canvas';

export type GroupConfig<Child> = {
  type: 'group';
  elements: Child[];
} & NodeConfig &
  TransformConfig;

export type GroupElement = NodeElement;

export function elements<Child>(config: GroupConfig<Child>) {
  return config.elements;
}

export function isGroup<Child>(config: {
  type: string;
}): config is GroupConfig<Child> {
  return config.type === 'group';
}
