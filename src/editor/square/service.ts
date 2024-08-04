import { ShapeConfig, ShapeElement } from 'editor/shape';

export type SquareConfig = ShapeConfig & {
  type: 'square';
  cornerRadius?: number[];
};

export type SquareElement = ShapeElement;
