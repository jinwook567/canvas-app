import { useSetRecoilState } from 'recoil';
import { stageClassesState, stagesState } from '../../../recoil/editor/atoms';
import { Stage } from '../../../types/editor';
import { isSameStage } from '../../../utils/editor/validate';
import { createUniqueId } from '../../../utils/unit';
import { Stage as StageClass } from '../../../utils/editor/shapes';

function useAdd() {
  const setStagesOld = useSetRecoilState(stagesState);

  const setStages = useSetRecoilState(stageClassesState);

  function addStage(stage: StageClass, addAfterThisStageId?: string) {
    setStages(stages =>
      stages.reduce(
        (acc, cur, index) =>
          (addAfterThisStageId && cur.id === addAfterThisStageId) ||
          (!addAfterThisStageId && index === stages.length - 1)
            ? [...acc, cur, stage]
            : [...acc, cur],
        [] as StageClass[]
      )
    );
  }

  function createStage(stage: Stage, beforeStage?: Stage) {
    if (beforeStage) {
      setStagesOld(currentVal =>
        currentVal.reduce(
          (acc, cur) =>
            isSameStage(cur, beforeStage)
              ? [...acc, cur, stage]
              : [...acc, cur],
          [] as Stage[]
        )
      );
    } else {
      setStagesOld(currentVal => [...currentVal, stage]);
    }
  }

  return {
    createStage,
    addStage,
  };
}

export function giveId(stageWithoutId: Omit<Stage, 'id'>): Stage {
  return { ...stageWithoutId, id: createUniqueId() };
}

export default useAdd;
