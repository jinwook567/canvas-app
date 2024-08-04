import { ShapeConfig, ShapeElement } from 'editor/shape/service';

export type SquareConfig = ShapeConfig & {
  type: 'square';
  cornerRadius?: number[];
};

export type SquareElement = ShapeElement;
