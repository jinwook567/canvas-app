import Konva from 'konva';
import { toNodeElement, NodeElement } from 'entities/canvas/node/model';
import { KonvaNodeEvents } from 'react-konva';

export type ShapeConfig = {
  width: number;
  height: number;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
};

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
    onDragEnd: e => onChange && onChange(toShapeConfig(e.target)),
    onTransformEnd: e => onChange && onChange(toShapeConfig(e.target)),
    onClick: e => onClick && onClick(toShapeConfig(e.target)),
  };
}

function toShapeConfig(shape: Konva.Node): ShapeConfig {
  return {
    width: shape.width(),
    height: shape.height(),
    x: shape.x(),
    y: shape.y(),
    scaleX: shape.scaleX(),
    scaleY: shape.scaleY(),
  };
}
