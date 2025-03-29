import {
  isContainer,
  Config as ContainerConfig,
  Type as ContainerType,
  toTransformLayer,
} from 'features/container';

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
