import {
  Id,
  Workspace,
  level,
  get,
  getParent,
  isChildren,
  isParent,
  types,
} from './core';

export type Ids = Set<Id>;

export const getParentByLevel = (
  workspace: Workspace,
  config: Workspace[Id],
  targetLevel: number
): Workspace[Id] | null => {
  if (!isChildren(config)) return null;

  const parent = getParent(workspace, config);
  return level(parent.type) === targetLevel
    ? parent
    : getParentByLevel(workspace, parent, targetLevel);
};

const maxLevel = Math.max(...types.map(type => level(type)));

export const getByLevel = (
  workspace: Workspace,
  config: Workspace[Id],
  targetLv: number
): Workspace[Id][] => {
  const configLv = level(config.type);
  if (targetLv > maxLevel || targetLv < 1) return [];

  if (configLv === targetLv) {
    return [config];
  } else if (configLv > targetLv && isParent(config)) {
    return config.children.flatMap(id =>
      getByLevel(workspace, get(workspace, id), targetLv)
    );
  } else {
    return isChildren(config)
      ? getByLevel(workspace, getParent(workspace, config), targetLv)
      : [];
  }
};

export const singleSelect = (targetId: Id) => new Set([targetId]);

export const select = (workspace: Workspace, ids: Ids, targetId: Id) => {
  if (ids.size === 0) return singleSelect(targetId);

  const [id] = ids.values();

  const idLv = level(get(workspace, id).type);
  const targetIdLv = level(get(workspace, targetId).type);

  if (Math.max(idLv, 2) === Math.max(targetIdLv, 2)) {
    if (
      getParentByLevel(workspace, get(workspace, id), idLv) ===
      getParentByLevel(workspace, get(workspace, targetId), idLv)
    ) {
      return new Set(ids).add(targetId);
    } else {
      return singleSelect(targetId);
    }
  } else if (idLv > targetIdLv) {
    return singleSelect(targetId);
  } else {
    const parent = getParentByLevel(workspace, get(workspace, id), targetIdLv);
    return new Set(parent ? [parent.id, targetId] : [targetId]);
  }
};

export const deselect = (ids: Ids, targetId: Id) => {
  return new Set([...ids].filter(id => id !== targetId));
};
