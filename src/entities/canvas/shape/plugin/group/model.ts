import { NodeElement } from 'entities/canvas/node/model';
import { ShapeConfig } from 'entities/canvas/shape/core/model';
import { PackageConfig } from 'entities/canvas/shape/plugin/package';

export type GroupConfig = Omit<ShapeConfig, 'width' | 'height'> & {
  type: 'group';
  shapes: PackageConfig[];
};

export type GroupElement = NodeElement;

export function shapes(group: GroupConfig) {
  return group.shapes;
}

export function setShapes(shapes: PackageConfig[], group: GroupConfig) {
  return { ...group, shapes };
}
