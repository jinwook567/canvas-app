// atoms
import { atom } from 'recoil';
import { KonvaStages } from '../types/editor';

export const stagesState = atom<KonvaStages>({
  key: 'stagesState',
  default: [[]],
});

export const workingStageIndexState = atom({
  key: 'workingStageIndexState',
  default: 0,
});

export default {};
