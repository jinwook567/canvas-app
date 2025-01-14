import { LayerConfig } from 'entities/canvas/layer/model';
import { NodeConfig, NodeElement } from 'entities/canvas/node/model';

export type StageConfig = {
  width: number;
  height: number;
  layers: LayerConfig['id'][];
} & NodeConfig;

export type Stages = StageConfig['id'][];

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

export function makeConfig(config: StageConfig) {
  return { ...config };
}
