import { atom } from 'jotai';
import { Id, Workspace, level, get, getParent } from './core';

export type Ids = Set<Id>;

export const ids = atom<Ids>(new Set<Id>());

const getParentByLevel = (
  workspace: Workspace,
  config: Workspace[Id],
  targetLevel: number
): Workspace[Id] | null => {
  if (!config.parent) return null;

  const parent = getParent(workspace, config);
  return level(parent.type) === targetLevel
    ? parent
    : getParentByLevel(workspace, parent, targetLevel);
};

export const singleSelect = (targetId: Id) => new Set([targetId]);

export const select = (workspace: Workspace, ids: Ids, targetId: Id) => {
  if (ids.size === 0) return singleSelect(targetId);

  const [id] = ids.values();

  const idLv = level(get(workspace, id).type);
  const targetIdLv = level(get(workspace, targetId).type);

  if (idLv === targetIdLv) {
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
  return new Set(ids).delete(targetId);
};
