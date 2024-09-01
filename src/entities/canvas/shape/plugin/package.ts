import { ShapeEvents } from 'entities/canvas/shape/core/model';
import * as packages from 'entities/canvas/shape/plugin/register';

export type Packages = typeof packages;
export type PackageName = keyof Packages;

export function component<T extends PackageName>(
  name: T
): Packages[T]['component'] {
  return packages[name].component;
}

export function model<T extends PackageName>(name: T): Packages[T]['model'] {
  return packages[name].model;
}

export type Props<T extends PackageName> = Parameters<
  Packages[T]['component']
>[0];

export type Config<T extends PackageName> = Omit<
  Props<T>,
  keyof ShapeEvents | 'ref' | 'children' | 'key'
>;

export type PackageConfig = PackageName extends infer O
  ? O extends PackageName
    ? Config<O>
    : never
  : never;
