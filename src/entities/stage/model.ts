import { NodeConfig, NodeElement, DimensionsConfig } from 'shared/canvas';

export type StageConfig<Child> = {
  type: 'stage';
  elements: Child[];
} & NodeConfig &
  DimensionsConfig;

export type StageElement = NodeElement;

export function elements<Child>(stage: StageConfig<Child>) {
  return stage.elements;
}
