import { NodeElement } from 'entities/canvas/node/model';
import { ShapeConfig } from 'entities/canvas/shape/core/model';

type Id = ShapeConfig['id'];

export type GroupConfig = Omit<ShapeConfig, 'width' | 'height'> & {
  type: 'group';
  shapes: Id[];
};

export type GroupElement = NodeElement;

export function setShapes(shapes: GroupConfig['shapes'], group: GroupConfig) {
  return { ...group, shapes };
}
