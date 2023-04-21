import { selector } from 'recoil';
import { selectedStageIdState, stageClassesState, stagesState } from './atoms';

export const stagesCountValue = selector({
  key: 'stagesCountState',
  get: ({ get }) => get(stagesState).length,
});

export const selectedStageValue = selector({
  key: 'selectedStageValue',
  get: ({ get }) => {
    const stages = get(stagesState);
    const selectedId = get(selectedStageIdState);
    return stages.find(stage => stage.id === selectedId);
  },
});

export const selectedStageClassValue = selector({
  key: 'selectedStageClassValue',
  get: ({ get }) => {
    const stages = get(stageClassesState);
    const selectedId = get(selectedStageIdState);
    return stages.find(stage => stage.id === selectedId);
  },
  dangerouslyAllowMutability: true,
});
