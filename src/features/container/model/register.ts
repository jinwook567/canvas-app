import React, { createElement, forwardRef } from 'react';
import { Group, GroupConfig, elements as groupElements } from 'entities/group';
import { Layer, LayerConfig, elements as layerElements } from 'entities/layer';
import { withPartial } from 'shared/ui';
import { Type, types } from 'features/shape';
import { Stage, StageConfig, elements as stageElements } from 'entities/stage';
import { GroupElement, GroupChild, LayerChild, LayerComponent } from './basic';

const groupElementTypes = [...types, 'group'] satisfies (
  | Type
  | GroupConfig<unknown>['type']
)[];

export const group = (config: GroupConfig<GroupChild>) => ({
  config,
  Component: withPartial(Group, config),
  elements: groupElements(config),
  elementTypes: groupElementTypes,
  Element: GroupElement,
});

export const layer = (config: LayerConfig<LayerChild>) => ({
  config,
  Component: withPartial(LayerComponent, config),
  // elements: layerElements(config).filter(
  //   config => config.type !== 'transformer'
  // ),
  elements: layerElements(config),
  elementTypes: groupElementTypes,
  Element: GroupElement,
});

export const stage = (config: StageConfig<LayerConfig<LayerChild>>) => ({
  config,
  Component: withPartial(Stage, config),
  elements: stageElements(config),
  elementTypes: ['layer' as const],
  Element: LayerComponent,
});
