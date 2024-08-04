import { NodeElement } from 'editor/node';
import { ShapeConfig } from 'editor/shape/service';

export type GroupConfig = Omit<ShapeConfig, 'width' | 'height'> & {
  type: 'group';
  shapes: [];
};

export type GroupElement = NodeElement;

export function shapes(group: GroupConfig) {
  return group.shapes;
}

export function setShapes(shapes: [], group: GroupConfig) {
  return { ...group, shapes };
}
