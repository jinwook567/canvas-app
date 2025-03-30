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
  update: (updater: (elements: ShapeElement[]) => ShapeElement[]) => void;
};

export function toUpdateConfig(shape: Konva.Node) {
  return omit(toShapeConfig(shape), 'width', 'height', 'id');
}

export function toTransformerElement(
  transformer: Konva.Transformer
): TransformerElement {
  return {
    update: updater =>
      transformer.nodes(
        updater(transformer.nodes().map(toNodeElement)).map(
          element => element._raw
        )
      ),
  };
}
