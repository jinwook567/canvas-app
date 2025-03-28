import { LayerConfig } from 'entities/layer';
import { TransformerConfig } from 'entities/transformer';
import { NodeConfig } from 'shared/canvas';
import { omit } from 'shared/lib';

export type TransformLayerConfig<Child> = Omit<LayerConfig<Child>, 'type'> & {
  type: 'transformLayer';
  transformers: (TransformerConfig & { elements: NodeConfig['id'][] })[];
};

export const toLayer = <Child>(config: TransformLayerConfig<Child>) => {
  return {
    ...omit(config, 'type', 'transformers'),
    type: 'layer' as const,
  };
};

export const toTransformLayer = <Child>(
  config: LayerConfig<Child>,
  transformers: TransformLayerConfig<Child>['transformers']
): TransformLayerConfig<Child> => {
  return {
    ...config,
    type: 'transformLayer',
    transformers,
  };
};
