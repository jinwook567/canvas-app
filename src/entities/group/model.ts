import { NodeElement, ShapeConfig } from 'shared/canvas';

type Id = ShapeConfig['id'];

export type GroupConfig = Omit<ShapeConfig, 'width' | 'height'> & {
  type: 'group';
  shapes: Id[];
};

export type GroupElement = NodeElement;

export function makeConfig(config: Omit<GroupConfig, 'type'>) {
  return { ...config, type: 'group' };
}

export function shapes(config: GroupConfig) {
  return config.shapes;
}
