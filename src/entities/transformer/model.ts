import {
  NodeConfig,
  ShapeElement,
  toShapeConfig,
  TransformConfig,
  toNodeElement,
} from 'shared/canvas';
import Konva from 'konva';
import { omit } from 'shared/lib';

export type UpdateConfig = NodeConfig & TransformConfig;

export type TransformerConfig = {
  type: 'transformer';
  ratio: 'fixed' | 'free';
  resize: boolean;
  rotate: boolean;
  flip: boolean;
  rule?: (prev: UpdateConfig, next: UpdateConfig) => UpdateConfig;
  elements: NodeConfig['id'][];
} & NodeConfig;

export type TransformerElement = {
  update: (elements: ShapeElement[]) => void;
};

function toUpdateConfig(shape: Konva.Node) {
  return omit(toShapeConfig(shape), 'width', 'height');
}

export function toUpdateConfigs(
  transformer: Konva.Transformer
): UpdateConfig[] {
  return (transformer.nodes() || []).map(node => toUpdateConfig(node));
}

export function toTransformerElement(
  transformer: Konva.Transformer
): TransformerElement {
  return {
    update: (elements: ShapeElement[]) => {
      transformer.nodes(elements.map(el => el._raw));
      transformer.getLayer()?.batchDraw();
    },
  };
}
