import { NodeConfig, NodeElement, TransformConfig } from 'shared/canvas';

export type GroupConfig<Child> = {
  type: 'group';
  shapes: Child[];
} & NodeConfig &
  TransformConfig;

export type GroupElement = NodeElement;

export function shapes<Child>(config: GroupConfig<Child>) {
  return config.shapes;
}

export function isGroup<Child>(config: {
  type: string;
}): config is GroupConfig<Child> {
  return config.type === 'group';
}
