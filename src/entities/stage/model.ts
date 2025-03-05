import { LayerConfig } from 'entities/layer/model';
import { NodeConfig, NodeElement } from 'shared/canvas'

export type StageConfig = {
  type: 'stage'
  width: number;
  height: number;
  layers: LayerConfig['id'][];
} & NodeConfig;

export type StageElement = NodeElement;

export function layers(stage: StageConfig) {
  return stage.layers;
}

export function width(stage: StageConfig) {
  return stage.width;
}

export function height(stage: StageConfig) {
  return stage.height;
}

export function makeConfig(config: Omit<StageConfig, 'type'>) {
  return { ...config, type: 'stage' };
}
