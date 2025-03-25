import React, { ForwardedRef, forwardRef } from 'react';
import {
  Group,
  GroupConfig,
  GroupElement as GroupElementType,
  elements as groupElements,
} from 'entities/group';
import { Layer, LayerConfig, elements as layerElements } from 'entities/layer';
import { withPartial } from 'shared/ui';
import { Type, Config, types, Shape } from 'features/shape';
import { Stage, StageConfig, elements as stageElements } from 'entities/stage';

interface Container<T> extends GroupConfig<T | Container<T>> {}

type Child<T> = T | Container<T>;

const groupElementTypes = [...types, 'group'] satisfies (
  | Type
  | GroupConfig<unknown>['type']
)[];

function GroupElement(
  config: GroupConfig<Child<Config<Type>>>['elements'][number],
  ref: ForwardedRef<GroupElementType>
) {
  return config.type === 'group' ? (
    <Group {...config} ref={ref}>
      {groupElements(config).map(element => (
        <GroupElement {...element} key={element.id} />
      ))}
    </Group>
  ) : (
    <Shape {...config} />
  );
}

export const group = (config: GroupConfig<Child<Config<Type>>>) => ({
  config,
  Component: withPartial(Group, config),
  elements: groupElements(config),
  elementTypes: groupElementTypes,
  Element: forwardRef(GroupElement),
});

export const layer = (config: LayerConfig<Child<Config<Type>>>) => ({
  config,
  Component: withPartial(Layer, config),
  elements: layerElements(config),
  elementTypes: groupElementTypes,
  Element: forwardRef(GroupElement),
});

export const stage = (
  config: StageConfig<LayerConfig<Child<Config<Type>>>>
) => ({
  config,
  Component: withPartial(Stage, config),
  elements: stageElements(config),
  elementTypes: ['layer'] satisfies LayerConfig<unknown>['type'][],
  Element: (config: LayerConfig<Child<Config<Type>>>) =>
    layer(config).Component,
});
