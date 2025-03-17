import {
  NodeConfig,
  NodeElement,
  DimensionsConfig,
  ShapeConfig,
} from 'shared/canvas';
import { LayerConfig } from 'entities/layer';

export type StageConfig<Child extends ShapeConfig> = {
  type: 'stage';
  layers: LayerConfig<Child>[];
} & NodeConfig &
  DimensionsConfig;

export type StageElement = NodeElement;

export function layers<Child extends ShapeConfig>(stage: StageConfig<Child>) {
  return stage.layers;
}
