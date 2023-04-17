import { useSetRecoilState } from 'recoil';
import { stageClassesState, stagesState } from '../../../recoil/editor/atoms';
import { Stage } from '../../../types/editor';
import { isSameStage } from '../../../utils/editor/validate';
import { createUniqueId } from '../../../utils/unit';
import { Stage as StageClass } from '../../../utils/editor/shapes';

function useCreate() {
  const setStagesOld = useSetRecoilState(stagesState);

  const setStages = useSetRecoilState(stageClassesState);

  function createStage2(stage: StageClass, beforeStage?: StageClass) {
    setStages(stages =>
      stages.reduce((acc, cur, index) => {
        if (
          (beforeStage && cur.id === beforeStage.id) ||
          (!beforeStage && index === stages.length - 1)
        )
          acc.push(stage);
        return acc;
      }, [] as StageClass[])
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
    createStage2,
  };
}

export function giveId(stageWithoutId: Omit<Stage, 'id'>): Stage {
  return { ...stageWithoutId, id: createUniqueId() };
}

export default useCreate;
