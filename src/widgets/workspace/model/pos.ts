import { isShapeConfig, ShapeConfig } from 'shared/canvas';
import {
  Workspace,
  Config,
  ChildrenTypes,
  get,
  ParentTypes,
  ByType,
} from './core';

const isSamePos = (config1: ShapeConfig, config2: ShapeConfig) => {
  return (
    config1.x === config2.x &&
    config1.y === config2.y &&
    config1.width === config2.width &&
    config1.height === config2.height
  );
};

export const reconcilePos = (
  ws: Workspace,
  parent: ByType<ParentTypes>,
  config: Config<ChildrenTypes>
) => {
  if (!isShapeConfig(config)) return config;

  const elements = parent.children
    .map(id => get(ws, id))
    .filter(el => isShapeConfig(el))
    .sort((a, b) => (a.x === b.x ? a.y - b.y : a.x - b.x));

  const adjustedPos = elements.reduce(
    (pos, el) => {
      return isSamePos(pos, el)
        ? { ...pos, x: pos.x + 10, y: pos.y + 10 }
        : pos;
    },
    { x: 0, y: 0, width: config.width, height: config.height, id: config.id }
  );

  return { ...config, ...adjustedPos };
};
