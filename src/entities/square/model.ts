import { ShapeConfig, ShapeElement } from 'shared/canvas';

export type SquareConfig = ShapeConfig & {
  type: 'square';
  cornerRadius?: [number, number, number, number];
};

export type SquareElement = ShapeElement;

export function makeConfig(config: Omit<SquareConfig, 'type'>) {
  return { ...config, type: 'square' };
}

export function cornerRadius(config: SquareConfig) {
  return config.cornerRadius ?? [0, 0, 0, 0];
}
