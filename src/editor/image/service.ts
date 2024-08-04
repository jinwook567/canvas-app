import { ShapeConfig, ShapeElement } from 'editor/shape/service';

export type ImageConfig = {
  type: 'image';
  source: CanvasImageSource;
} & ShapeConfig;

export type ImageElement = ShapeElement;
