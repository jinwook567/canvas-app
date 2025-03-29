import {
  isContainer,
  Config as ContainerConfig,
  Type as ContainerType,
  toTransformLayer,
} from 'features/container';
import { Ids } from './select';

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
