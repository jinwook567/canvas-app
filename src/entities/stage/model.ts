import { NodeConfig, NodeElement, DimensionsConfig } from 'shared/canvas';
import { LayerConfig } from 'entities/layer';

export type StageConfig<Child> = {
  type: 'stage';
  layers: LayerConfig<Child>[];
} & NodeConfig &
  DimensionsConfig;

export type StageElement = NodeElement;

export function layers<Child>(stage: StageConfig<Child>) {
  return stage.layers;
}
