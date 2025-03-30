import { ShapeConfig, ShapeElement } from 'shared/canvas';

export type SquareConfig = ShapeConfig & {
  type: 'square';
  cornerRadius?: [number, number, number, number];
  fill: string;
};

export type SquareElement = ShapeElement;

export function cornerRadius(config: SquareConfig) {
  return config.cornerRadius ?? [0, 0, 0, 0];
}
