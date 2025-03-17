import Konva from 'konva';
import { toNodeElement, NodeElement, NodeConfig } from './node';
import { KonvaNodeEvents } from 'react-konva';

export type ShapeConfig = {
  width: number;
  height: number;
  x: number;
  y: number;
  scaleX?: number;
  scaleY?: number;
} & NodeConfig;

export function width(config: ShapeConfig) {
  return config.width;
}

export function height(config: ShapeConfig) {
  return config.height;
}

export function x(config: ShapeConfig) {
  return config.x;
}

export function y(config: ShapeConfig) {
  return config.y;
}

export function scaleX(config: ShapeConfig) {
  return config.scaleX ?? 1;
}

export function scaleY(config: ShapeConfig) {
  return config.scaleY ?? 1;
}

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
    id: shape.id(),
  };
}
