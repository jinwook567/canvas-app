import {
  isContainer,
  Config as ContainerConfig,
  Type as ContainerType,
  toTransformLayer,
} from 'features/container';
import { Ids } from './select';
import { DimensionsConfig } from 'shared/canvas';
import { Config, ConfigType } from './core';

export const toTransformable = <T extends ContainerType>(
  config: ContainerConfig<T>,
  transformers: ContainerConfig<'transformLayer'>['transformers']
): ContainerConfig<T> => {
  return config.type === 'layer'
    ? toTransformLayer(config, transformers)
    : {
        ...config,
        elements: config.elements.map(el =>
          isContainer(el) ? toTransformable(el, transformers) : el
        ),
      };
};

export const transformerConfigByIds = (ids: Ids) => {
  return {
    type: 'transformer' as const,
    ratio: 'fixed' as const,
    resize: true,
    rotate: false,
    flip: false,
    elements: [...ids.values()],
    id: 'player1',
  };
};

export const previewConfig = (
  dimension: DimensionsConfig,
  config: Config<Exclude<ConfigType, 'stage'>>
): ContainerConfig<'stage'> => {
  const layer =
    config.type === 'layer' || config.type === 'transformLayer'
      ? config
      : {
          type: 'layer' as const,
          id: 'preview-layer',
          elements: [config],
        };

  return {
    type: 'stage',
    elements: [layer].map(el => ({ ...el, lock: true })),
    id: 'preview-stage',
    width: dimension.width,
    height: dimension.height,
  };
};
