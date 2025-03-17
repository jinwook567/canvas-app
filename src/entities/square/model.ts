import { ShapeConfig, ShapeElement } from 'shared/canvas';

export type SquareConfig = ShapeConfig & {
  type: 'square';
  cornerRadius?: [number, number, number, number];
};

export type SquareElement = ShapeElement;

export function cornerRadius(config: SquareConfig) {
  return config.cornerRadius ?? [0, 0, 0, 0];
}
