export type ControlConfig = {
  visible?: boolean;
  lock?: boolean;
};

export function visible(config: ControlConfig) {
  return config.visible ?? true;
}

export function lock(config: ControlConfig) {
  return config.lock ?? false;
}
