import { useSetRecoilState } from 'recoil';
import { stageClassesState } from '../../../recoil/editor/atoms';
import { Stage as StageClass } from '../../../utils/editor/shapes';

function useAdd() {
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

  return {
    addStage,
  };
}

export default useAdd;
