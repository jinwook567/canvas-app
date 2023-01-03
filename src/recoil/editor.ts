// atoms
import { atom, selector } from 'recoil';
import {
  KonvaStages,
  SelectedIds,
  StageIndex,
  StageSize,
} from '../types/editor';

export const stagesState = atom<KonvaStages>({
  key: 'stagesState',
  default: [[]],
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
    const stages = get(stagesState);
    const currentStageIndex = get(currentStageIndexState);
    return stages[currentStageIndex];
  },
});

export default {};
