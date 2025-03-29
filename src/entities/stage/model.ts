import { NodeConfig, DimensionsConfig, ContainerElement } from 'shared/canvas';

export type StageConfig<Child> = {
  type: 'stage';
  elements: Child[];
  fill?: string;
} & NodeConfig &
  DimensionsConfig;

export type StageElement = ContainerElement;

export function elements<Child>(stage: StageConfig<Child>) {
  return stage.elements;
}
