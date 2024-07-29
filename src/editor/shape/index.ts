import Konva from 'konva';
import { convertNode, NodeElement } from 'editor/node';

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
