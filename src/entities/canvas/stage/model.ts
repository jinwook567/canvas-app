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

export function setLayers(layers: StageConfig['layers'], stage: StageConfig) {
  return { ...stage, layers };
}
