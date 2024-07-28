import { Layer } from 'editor/layer/service';
import { Node } from 'editor/node';

export type Stage = { width: number; height: number; layers: Layer[] };

export type StageNode = Node;

export function layers(stage: Stage) {
  return stage.layers;
}

export function setChildren(layers: Stage['layers'], stage: Stage) {
  return { ...stage, layers };
}
