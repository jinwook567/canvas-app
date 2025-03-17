import { Group, GroupConfig, shapes as groupShapes } from 'entities/group';
import { Layer, LayerConfig, shapes as layerShapes } from 'entities/layer';
import { withPartial } from 'shared/ui';
import { Type, Config } from 'features/shape';

export const group = (
  config: GroupConfig<Config<Type> | GroupConfig<Config<Type>>>
) => ({
  config,
  Component: withPartial(Group, config),
  shapes: groupShapes(config),
});

export const layer = (config: LayerConfig<Config<Type>>) => ({
  config,
  Component: withPartial(Layer, config),
  shapes: layerShapes(config),
});
