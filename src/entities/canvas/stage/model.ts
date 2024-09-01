import { LayerConfig } from 'entities/canvas/layer/model';
import { NodeElement } from 'entities/canvas/node/model';

export type StageConfig = {
  width: number;
  height: number;
  layers: LayerConfig[];
};

export type StageElement = NodeElement;

export function layers(stage: StageConfig) {
  return stage.layers;
}

export function setLayers(layers: StageConfig['layers'], stage: StageConfig) {
  return { ...stage, layers };
}
