import Konva from 'konva';
import { convertNode, NodeElement } from 'editor/node';
import { KonvaNodeEvents } from 'react-konva';
import * as shapePackage from 'editor/shape/package';

export type ShapeConfig = {
  width: number;
  height: number;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
};

export type ShapeElement = NodeElement;

export function convertShape(shape: Konva.Shape): ShapeElement {
  return convertNode(shape);
}

export type ShapeEvents = {
  onChange?: (config: ShapeConfig) => void;
  onClick?: (config: ShapeConfig) => void;
};

export function convertEvent<T extends ShapeEvents>(
  events: T
): Pick<KonvaNodeEvents, 'onDragEnd' | 'onTransformEnd' | 'onClick'> {
  const { onChange, onClick, ...rest } = events;

  return {
    ...rest,
    onDragEnd: e => onChange && onChange(elementInfo(e.target)),
    onTransformEnd: e => onChange && onChange(elementInfo(e.target)),
    onClick: e => onClick && onClick(elementInfo(e.target)),
  };
}

function elementInfo(shape: Konva.Node): ShapeConfig {
  return {
    width: shape.width(),
    height: shape.height(),
    x: shape.x(),
    y: shape.y(),
    scaleX: shape.scaleX(),
    scaleY: shape.scaleY(),
  };
}

type ShapePackage = typeof shapePackage;

export function component<T extends keyof ShapePackage>(
  type: T
): ShapePackage[T]['component'] {
  return shapePackage[type].component;
}

type ShapePackageConfigBase<T extends keyof ShapePackage> = Omit<
  Parameters<ShapePackage[T]['component']>[0],
  keyof ShapeEvents
>;

export type ShapePackageConfig = keyof ShapePackage extends infer K
  ? K extends keyof ShapePackage
    ? ShapePackageConfigBase<K>
    : never
  : never;
