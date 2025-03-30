import {
  isContainer,
  Config as ContainerConfig,
  Type as ContainerType,
  toTransformLayer,
} from 'features/container';
import { Ids } from './select';
import { DimensionsConfig } from 'shared/canvas';
import { Config as ShapeConfig, Type as ShapeType } from 'features/shape';

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
  config: DimensionsConfig,
  target:
    | ContainerConfig<Exclude<ContainerType, 'stage'>>
    | ShapeConfig<ShapeType>
): ContainerConfig<'stage'> => {
  const el =
    target.type === 'layer' || target.type === 'transformLayer'
      ? target
      : { type: 'layer' as const, id: 'preview-layer', elements: [target] };

  return {
    type: 'stage',
    elements: [el],
    id: 'preview-stage',
    width: config.width,
    height: config.height,
  };
};
