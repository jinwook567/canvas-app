// atoms
import { atom } from 'recoil';
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

export const workingStageIndexState = atom<StageIndex>({
  key: 'workingStageIndexState',
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

export default {};
