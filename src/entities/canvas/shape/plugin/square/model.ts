import { ShapeConfig, ShapeElement } from 'entities/canvas/shape/core/model';

export type SquareConfig = ShapeConfig & {
  type: 'square';
  cornerRadius?: [number, number, number, number];
};

export type SquareElement = ShapeElement;
