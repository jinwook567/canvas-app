import { useState } from 'react';
import {
  Workspace,
  level,
  Config,
  ChildrenTypes,
  Id,
  insert,
  get,
  toWorkspace,
  ParentTypes,
  ByType,
  remove,
} from './core';
import { Ids, getByLevel } from './select';

function useControl(initialWs: Workspace) {
  const [workspace, setWorkspace] = useState(initialWs);
  const [selectedIds, setSelectedIds] = useState<Ids>(new Set());

  const onInsert = (config: Config<ChildrenTypes>) => {
    if (selectedIds.size > 0) {
      const [first] = selectedIds;
      setWorkspace(insertBySelect(workspace, first, config));
    } else {
      const stage = Object.values(workspace).find(c => c.type === 'stage');
      if (stage) setWorkspace(insertBySelect(workspace, stage.id, config));
    }
  };

  const onRemove = () => {
    const [...ids] = selectedIds;
    setWorkspace(ids.reduce((ws, id) => remove(ws, get(ws, id)), workspace));
    setSelectedIds(new Set());
  };

  return {
    onInsert,
    onRemove,
    workspace,
    setWorkspace,
    selectedIds,
    setSelectedIds,
  };
}

const insertBySelect = (
  ws: Workspace,
  selectedId: Id,
  config: Config<ChildrenTypes>
) => {
  const configLv = level(config.type);
  const selected = get(ws, selectedId);
  const selectedLv = level(selected.type);
  const parentLv = Math.max(configLv + 1, 3);

  const parent = (
    parentLv === selectedLv ? selected : getByLevel(ws, selected, parentLv)[0]
  ) as ByType<ParentTypes> | null;
  if (!parent) return ws;

  const configWs = toWorkspace(config, parent.id);
  return insert(
    { ...ws, ...configWs },
    parent,
    get(configWs, config.id) as ByType<ChildrenTypes>
  );
};

export default useControl;
