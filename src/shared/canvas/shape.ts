import Konva from 'konva';
import { toNodeElement, NodeElement, NodeConfig } from './node';
import { KonvaNodeEvents } from 'react-konva';
import { DimensionsConfig } from './dimensions';
import { TransformConfig } from './transform';

export type ShapeConfig = NodeConfig & DimensionsConfig & TransformConfig;

export type ShapeElement = NodeElement;

export function toShapeElement(shape: Konva.Shape): ShapeElement {
  return toNodeElement(shape);
}

export type ShapeEvents = {
  onChange?: (config: ShapeConfig) => void;
  onClick?: (config: ShapeConfig) => void;
};

export function adaptShapeEvents<T extends ShapeEvents>(
  events: T
): Pick<KonvaNodeEvents, 'onDragEnd' | 'onTransformEnd' | 'onClick'> {
  const { onChange, onClick, ...rest } = events;

  return {
    ...rest,
    onDragEnd: e => onChange && onChange(toShapeConfig(e.currentTarget)),
    onTransformEnd: e => onChange && onChange(toShapeConfig(e.currentTarget)),
    onClick: e => onClick && onClick(toShapeConfig(e.currentTarget)),
  };
}

export function toShapeConfig(shape: Konva.Node): ShapeConfig {
  return {
    width: shape.width(),
    height: shape.height(),
    x: shape.x(),
    y: shape.y(),
    scaleX: shape.scaleX(),
    scaleY: shape.scaleY(),
    id: shape.id(),
  };
}
