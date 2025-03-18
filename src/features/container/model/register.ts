import { Group, GroupConfig, shapes as groupShapes } from 'entities/group';
import { Layer, LayerConfig, shapes as layerShapes } from 'entities/layer';
import { withPartial } from 'shared/ui';
import { Type, Config } from 'features/shape';

interface Container<T> extends GroupConfig<T | Container<T>> {}

type Child<T> = T | Container<T>;

export const group = (config: GroupConfig<Child<Config<Type>>>) => ({
  config,
  Component: withPartial(Group, config),
  shapes: groupShapes(config),
});

export const layer = (config: LayerConfig<Child<Config<Type>>>) => ({
  config,
  Component: withPartial(Layer, config),
  shapes: layerShapes(config),
});
