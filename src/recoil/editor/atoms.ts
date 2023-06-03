import { atom, DefaultValue, selector } from 'recoil';
import { Child, Stage } from '../../utils/editor/node';
import S, { Stages } from '../../utils/editor/stages';

export const stagesState = atom<Stages>({
  key: 'stagesState',
  default: [],
});

const selectedStageIdState = atom<string | null>({
  key: 'selectedStageIdState',
  default: null,
});

export const selectedStageState = selector<Stage | null>({
  key: 'selectedStageState',
  get: ({ get }) => {
    const id = get(selectedStageIdState);
    if (!id) return null;

    const stages = get(stagesState);
    return S.filter(S.equals({ id }), stages)[0] || null;
  },
  set: ({ set }, newValue) => {
    set(
      selectedStageIdState,
      newValue instanceof DefaultValue ? newValue : newValue?.id || null
    );
  },
});

export const selectedIdsState = atom<string[]>({
  key: 'selectedIdsState',
  default: [],
});

export const selectedNodesState = selector<Child[]>({
  key: 'selectedChildState',
  get: ({ get }) => {
    const stages = get(stagesState);
    const selectedIds = get(selectedIdsState);
    const allNodes = S.iter(stages).flatMap(stage => stage.children);

    const isSelected = (child: Child) => selectedIds.includes(child.id);
    return allNodes.filter(isSelected);
  },
});

type HistoryState = {
  stages: Stages;
  prev: HistoryState;
  next: HistoryState;
} | null;

export const historyState = atom<HistoryState>({
  key: 'historyState',
  default: null,
});
