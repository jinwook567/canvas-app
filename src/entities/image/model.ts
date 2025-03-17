import { ShapeConfig, ShapeElement } from 'shared/canvas';

export type ImageConfig = {
  type: 'image';
  source: CanvasImageSource;
} & ShapeConfig;

export type ImageElement = ShapeElement;

export function source(config: ImageConfig) {
  return config.source;
}
