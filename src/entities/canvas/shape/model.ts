import { ShapeConfig } from 'entities/canvas/shape/core/model';
import { PackageConfig } from 'entities/canvas/shape/plugin/package';
export * from 'entities/canvas/shape/core/model';
export * from 'entities/canvas/shape/plugin/package';

export type Shapes = {
  [key: ShapeConfig['id']]: PackageConfig;
};
