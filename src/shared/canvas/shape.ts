import Konva from 'konva';
import { toNodeElement, NodeElement, NodeConfig, id } from './node';
import { KonvaNodeEvents } from 'react-konva';
import { DimensionsConfig, height, width } from './dimensions';
import { scaleX, scaleY, TransformConfig, x, y } from './transform';
import { ControlConfig, draggable, lock, visible } from './control';

export type ShapeConfig = NodeConfig &
  DimensionsConfig &
  TransformConfig &
  ControlConfig;

export type ShapeElement = NodeElement;

export function toShapeElement(shape: Konva.Shape): ShapeElement {
  return toNodeElement(shape);
}

export type ShapeEvents = {
  onChange?: (config: ShapeConfig) => void;
  onClick?: (config: ShapeConfig) => void;
};

export function adaptConfig(config: ShapeConfig) {
  return {
    ...config,
    id: id(config),
    width: width(config),
    height: height(config),
    x: x(config),
    y: y(config),
    scaleX: scaleX(config),
    scaleY: scaleY(config),
    visible: visible(config),
    lock: lock(config),
    draggable: draggable(config),
  };
}

export function adaptShapeEvents<T extends ShapeEvents>(
  events: T
): Pick<KonvaNodeEvents, 'onDragEnd' | 'onTransformEnd' | 'onClick'> {
  const { onChange, onClick } = events;

  return {
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

export function isShapeConfig(shape: object): shape is ShapeConfig {
  return (
    'width' in shape &&
    'height' in shape &&
    'x' in shape &&
    'y' in shape &&
    'id' in shape
  );
}
