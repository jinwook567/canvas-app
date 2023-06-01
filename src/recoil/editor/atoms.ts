import { atom } from 'recoil';
import { Stages } from '../../utils/editor/stages';

export const stagesState = atom<Stages>({
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
  stages: Stages;
  prev: HistoryState;
  next: HistoryState;
} | null;

export const historyState = atom<HistoryState>({
  key: 'historyState',
  default: null,
});
