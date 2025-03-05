import { ShapeConfig, ShapeElement } from 'shared/canvas';

export type ImageConfig = {
  type: 'image';
  source: CanvasImageSource;
} & ShapeConfig;

export type ImageElement = ShapeElement;

export function makeConfig(config: Omit<ImageConfig, 'type'>) {
  return { ...config, type: 'image' };
}

export function source(config: ImageConfig) {
  return config.source;
}
