import { LayerConfig } from 'entities/layer/model';
import { Shapes } from 'entities/canvas/shape/model';
import { GroupConfig } from 'entities/canvas/shape/plugin/group/model';

export { default as Stage } from 'entities/stage/ui';
export { default as Layer } from 'entities/layer/ui';
export { default as Shape } from 'entities/canvas/shape';
export * from 'entities/layer/model';
export * from 'entities/stage/model';
export * from 'entities/canvas/shape/model';

export function shapes(container: GroupConfig | LayerConfig) {
  return container.shapes;
}

export function children(
  container: GroupConfig | LayerConfig,
  collection: Shapes
): Child[] {
  return shapes(container).map(id => {
    const shape = collection[id];
    return shape.type === 'group'
      ? { ...shape, children: children(shape, collection) }
      : shape;
  });
}

type Child = Shapes[keyof Shapes] extends infer A
  ? A extends { type: 'group' }
    ? A & { children: Child[] }
    : A
  : never;
