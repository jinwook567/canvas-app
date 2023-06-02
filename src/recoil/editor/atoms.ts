import { atom, DefaultValue, selector } from 'recoil';
import { Stage } from '../../utils/editor/node';
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

type HistoryState = {
  stages: Stages;
  prev: HistoryState;
  next: HistoryState;
} | null;

export const historyState = atom<HistoryState>({
  key: 'historyState',
  default: null,
});
