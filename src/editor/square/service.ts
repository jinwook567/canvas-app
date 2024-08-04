import { ShapeConfig, ShapeElement } from 'editor/shape/service';

export type SquareConfig = ShapeConfig & {
  type: 'square';
  cornerRadius?: [number, number, number, number];
};

export type SquareElement = ShapeElement;
