import { Node } from 'editor/node';

export type Stage = { width: number; height: number; layers: [] };

export type StageNode = Node;

export function layers(stage: Stage) {
  return stage.layers;
}

export function setChildren(layers: Stage['layers'], stage: Stage) {
  return { ...stage, layers };
}
