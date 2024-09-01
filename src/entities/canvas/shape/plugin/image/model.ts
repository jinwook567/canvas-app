import { ShapeConfig, ShapeElement } from 'entities/canvas/shape/core/model';

export type ImageConfig = {
  type: 'image';
  source: CanvasImageSource;
} & ShapeConfig;

export type ImageElement = ShapeElement;
