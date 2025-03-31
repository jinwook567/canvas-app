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
import { Ids, deselect, getByLevel, select, singleSelect } from './select';
import {
  before,
  getWorkspace,
  hasBefore,
  hasNext,
  History,
  insertHistory,
  next,
} from './history';
import { isHotkeyPressed } from 'react-hotkeys-hook';
import { reconcilePos } from './pos';

function useControl(initialWs: Workspace) {
  const [workspace, setWorkspace] = useState(initialWs);
  const [selectedIds, setSelectedIds] = useState<Ids>(new Set());
  const [history, setHistory] = useState<History>({
    ws: [initialWs],
    counter: 0,
  });

  const onChange = (ws: Workspace) => {
    setWorkspace(ws);
    setHistory(hs => insertHistory(hs, ws));
  };

  const onInsert = (config: Config<ChildrenTypes>) => {
    if (selectedIds.size > 0) {
      const [first] = selectedIds;
      onChange(insertBySelect(workspace, first, config));
    } else {
      const stage = Object.values(workspace).find(c => c.type === 'stage');
      if (stage) onChange(insertBySelect(workspace, stage.id, config));
    }
  };

  const onRemove = () => {
    const [...ids] = selectedIds;
    onChange(ids.reduce((ws, id) => remove(ws, get(ws, id)), workspace));
    setSelectedIds(new Set());
  };

  const onUndo = () => {
    if (hasBefore(history)) {
      setWorkspace(getWorkspace(before(history)));
      setHistory(before(history));
    }
  };

  const onRedo = () => {
    if (hasNext(history)) {
      setWorkspace(getWorkspace(next(history)));
      setHistory(next(history));
    }
  };

  const onSelect = (id: Id) => {
    if (isHotkeyPressed('shift')) {
      setSelectedIds(
        selectedIds.has(id)
          ? deselect(selectedIds, id)
          : select(workspace, selectedIds, id)
      );
    } else {
      setSelectedIds(singleSelect(id));
    }
  };

  const onClearSelect = () => {
    setSelectedIds(new Set([]));
  };

  return {
    onInsert,
    onRemove,
    workspace,
    setWorkspace,
    selectedIds,
    setSelectedIds,
    onChange,
    onUndo,
    onRedo,
    onSelect,
    onClearSelect,
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

  const configWs = toWorkspace(reconcilePos(ws, parent, config), parent.id);
  return insert(
    { ...ws, ...configWs },
    parent,
    get(configWs, config.id) as ByType<ChildrenTypes>
  );
};

export default useControl;
