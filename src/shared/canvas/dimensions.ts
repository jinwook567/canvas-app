export type DimensionsConfig = {
  width: number;
  height: number;
};

export function width(config: DimensionsConfig) {
  return config.width;
}

export function height(config: DimensionsConfig) {
  return config.height;
}
