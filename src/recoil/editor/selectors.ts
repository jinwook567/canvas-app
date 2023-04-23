import { selector } from 'recoil';
import { selectedStageIdState, stageClassesState } from './atoms';

export const selectedStageClassValue = selector({
  key: 'selectedStageClassValue',
  get: ({ get }) => {
    const stages = get(stageClassesState);
    const selectedId = get(selectedStageIdState);
    return stages.find(stage => stage.id === selectedId);
  },
  dangerouslyAllowMutability: true,
});
