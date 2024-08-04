import { ShapeConfig, ShapeElement } from 'editor/shape';

export type ImageConfig = {
  type: 'image';
  source: CanvasImageSource;
} & ShapeConfig;

export type ImageElement = ShapeElement;
