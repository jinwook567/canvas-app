import { LayerConfig } from 'editor/layer/service';
import { NodeElement } from 'editor/node';

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
