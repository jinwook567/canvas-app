import { atom } from 'recoil';
import { Stage } from '../../utils/editor/shapes';

export const stageClassesState = atom<Stage[]>({
  key: 'stagesClassState',
  default: [],
  dangerouslyAllowMutability: true,
});

export const selectedStageIdState = atom<string | null>({
  key: 'selectedStageIdState',
  default: null,
});

export const selectedIdsState = atom<string[]>({
  key: 'selectedIdsState',
  default: [],
});

type HistoryState = {
  stages: Stage[];
  prev: HistoryState;
  next: HistoryState;
} | null;

export const historyState = atom<HistoryState>({
  key: 'historyState',
  default: null,
  dangerouslyAllowMutability: true,
});
