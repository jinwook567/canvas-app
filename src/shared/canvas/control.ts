export type ControlConfig = {
  visible?: boolean;
  lock?: boolean;
  draggable?: boolean;
};

export function visible(config: ControlConfig) {
  return config.visible ?? true;
}

export function lock(config: ControlConfig) {
  return config.lock ?? false;
}

export function draggable(config: ControlConfig) {
  return config.draggable ?? true;
}
