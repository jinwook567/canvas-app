// atoms
import { atom } from 'recoil';
import { KonvaStages, StageIndex } from '../types/editor';

export const stagesState = atom<KonvaStages>({
  key: 'stagesState',
  default: [[]],
});

export const workingStageIndexState = atom<StageIndex>({
  key: 'workingStageIndexState',
  default: 0,
});

export default {};
