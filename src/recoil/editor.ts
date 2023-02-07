import { atom, DefaultValue, selector } from 'recoil';
import {
  KonvaStageList,
  SelectedIds,
  StageIndex,
  StageSize,
} from '../types/editor';

export const stageListState = atom<KonvaStageList>({
  key: 'stageList',
  default: [[]],
});

export const stageCountState = selector({
  key: 'stageCountState',
  get: ({ get }) => {
    const stages = get(stageListState);
    return stages.length;
  },
});

export const currentStageIndexState = atom<StageIndex>({
  key: 'currentStageIndexState',
  default: 0,
});

export const stageSizeState = atom<StageSize>({
  key: 'stageSizeState',
  default: {
    width: 0,
    height: 0,
  },
});

export const selectedIdsState = atom<SelectedIds>({
  key: 'selectedIdsState',
  default: [],
});

export const currentStageState = selector({
  key: 'currentStageState',
  get: ({ get }) => {
    const stages = get(stageListState);
    const currentStageIndex = get(currentStageIndexState);
    return stages[currentStageIndex];
  },
  set: ({ set, get }, newValue) => {
    const stages = get(stageListState);
    const currentStageIndex = get(currentStageIndexState);
    set(
      stageListState,
      stages.map((stage, index) =>
        index === currentStageIndex && !(newValue instanceof DefaultValue)
          ? newValue
          : stage
      )
    );
  },
});

export const isTriggeredDownloadState = atom({
  key: 'isTriggeredDownloadState',
  default: false,
});

type HistoryNode = {
  stageList: KonvaStageList;
  prev: HistoryNode;
  next: HistoryNode;
} | null;

export const historyState = atom<{
  head: HistoryNode;
}>({
  key: 'historyState',
  default: {
    head: { stageList: [[]], next: null, prev: null },
  },
  effects: [],
});
