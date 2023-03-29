import { useSetRecoilState } from 'recoil';
import { stagesState } from '../../../recoil/editor/atoms';
import { Stage } from '../../../types/editor';
import { isSameStage } from '../../../utils/editor/validate';
import { createUniqueId } from '../../../utils/unit';

function useCreate() {
  const setStages = useSetRecoilState(stagesState);

  function createStage(stage: Stage, beforeStage?: Stage) {
    if (beforeStage) {
      setStages(currentVal =>
        currentVal.reduce(
          (acc, cur) =>
            isSameStage(cur, beforeStage)
              ? [...acc, cur, stage]
              : [...acc, cur],
          [] as Stage[]
        )
      );
    } else {
      setStages(currentVal => [...currentVal, stage]);
    }
  }

  return {
    createStage,
  };
}

export function giveId(stageWithoutId: Omit<Stage, 'id'>): Stage {
  return { ...stageWithoutId, id: createUniqueId() };
}

export default useCreate;
