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

export const historyState = atom<KonvaStageList[]>({
  key: 'historyState',
  default: [],
});

export const historyStepState = atom({
  key: 'historyStepState',
  default: 0,
});
