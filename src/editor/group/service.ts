import { NodeElement } from 'editor/node';
import { ShapeConfig } from 'editor/shape';

export type GroupConfig = Omit<ShapeConfig, 'width' | 'height'> & {
  shapes: [];
};

export type GroupElement = NodeElement;

export function shapes(group: GroupConfig) {
  return group.shapes;
}

export function setShapes(shapes: [], group: GroupConfig) {
  return { ...group, shapes };
}
