import { NodeConfig, NodeElement, DimensionsConfig } from 'shared/canvas';

export type StageConfig<Child> = {
  type: 'stage';
  layers: Child[];
} & NodeConfig &
  DimensionsConfig;

export type StageElement = NodeElement;

export function layers<Child>(stage: StageConfig<Child>) {
  return stage.layers;
}
