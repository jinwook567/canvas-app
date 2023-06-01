import { selector } from 'recoil';
import { selectedStageIdState, stagesState } from './atoms';

export const selectedStageClassValue = selector({
  key: 'selectedStageClassValue',
  get: ({ get }) => {
    const stages = get(stagesState);
    const selectedId = get(selectedStageIdState);
    return stages.find(stage => stage.id === selectedId);
  },
});
