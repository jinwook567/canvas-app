import { atom } from 'recoil';
import { Stage } from '../../utils/editor/shapes';
import { Stage as StageType, Shape } from '../../types/editor';

export const stageClassesState = atom<Stage<Shape>[]>({
  key: 'stagesClassState',
  default: [],
  dangerouslyAllowMutability: true,
});

export const stagesState = atom<StageType[]>({
  key: 'stagesState',
  default: [],
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
  stages: StageType[];
  prev: HistoryState;
  next: HistoryState;
} | null;

export const historyState = atom<HistoryState>({
  key: 'historyState',
  default: null,
});

export const isExportRequestedState = atom({
  key: 'isExportRequestedState',
  default: false,
});
