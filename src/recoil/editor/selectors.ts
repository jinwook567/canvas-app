import { selector, DefaultValue } from 'recoil';
import { selectedStageIdState, stagesState } from './atoms';

export const selectedStageState = selector({
  key: 'selectedStageState',
  get: ({ get }) => {
    const stages = get(stagesState);
    const selectedStageId = get(selectedStageIdState);
    return stages.find(stage => stage.id === selectedStageId);
  },
  set: ({ set, get }, newValue) => {
    const stages = get(stagesState);
    const selectedStageId = get(selectedStageIdState);
    set(
      stagesState,
      stages.map(stage =>
        stage.id === selectedStageId &&
        !(newValue instanceof DefaultValue) &&
        newValue
          ? newValue
          : stage
      )
    );
  },
});
