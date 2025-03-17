export type TransformConfig = {
  x: number;
  y: number;
  scaleX?: number;
  scaleY?: number;
};

export function x(config: TransformConfig) {
  return config.x;
}

export function y(config: TransformConfig) {
  return config.y;
}

export function scaleX(config: TransformConfig) {
  return config.scaleX ?? 1;
}

export function scaleY(config: TransformConfig) {
  return config.scaleY ?? 1;
}
