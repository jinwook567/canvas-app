import { Group, GroupConfig, elements as groupElements } from 'entities/group';
import { LayerConfig, elements as layerElements, Layer } from 'entities/layer';
import { withPartial } from 'shared/ui';
import { Type, types, Config } from 'features/shape';
import { Stage, StageConfig, elements as stageElements } from 'entities/stage';
import {
  TransformLayerConfig,
  TransformLayer,
  toLayer,
} from './derived/transformLayer';

interface Container<T> extends GroupConfig<T | Container<T>> {}

export type Child<T> = T | Container<T>;

export type GroupChild = Child<Config<Type>>;

const groupElementTypes = [...types, 'group'] satisfies (
  | Type
  | GroupConfig<unknown>['type']
)[];

export const group = (config: GroupConfig<GroupChild>) => ({
  config,
  Component: withPartial(Group, config),
  elements: groupElements(config),
  elementTypes: groupElementTypes,
});

export const layer = (config: LayerConfig<GroupChild>) => ({
  config,
  Component: withPartial(Layer, config),
  elements: layerElements(config),
  elementTypes: groupElementTypes,
});

export const transformLayer = (config: TransformLayerConfig<GroupChild>) => ({
  config,
  Component: withPartial(TransformLayer, config),
  elements: layerElements(toLayer(config)),
  elementTypes: groupElementTypes,
});

export const stage = (
  config: StageConfig<
    LayerConfig<GroupChild> | TransformLayerConfig<GroupChild>
  >
) => ({
  config,
  Component: withPartial(Stage, config),
  elements: stageElements(config),
  elementTypes: ['layer' as const, 'transformLayer' as const],
});
