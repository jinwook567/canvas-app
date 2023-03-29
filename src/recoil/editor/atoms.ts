import { atom } from 'recoil';
import { Stage } from '../../types/editor';

export const stagesState = atom<Stage[]>({
  key: 'stagesState',
  default: [],
});

export const selectedStageState = atom<Stage | null>({
  key: 'selectedStage',
  default: null,
});

export const selectedNodesState = atom<Stage['nodes']>({
  key: 'selectedNodes',
  default: [],
});

export const selectedStageIdState = atom<string>({
  key: 'selectedStageIdState',
  default: '',
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
});

export const isExportRequestedState = atom({
  key: 'isExportRequestedState',
  default: false,
});
