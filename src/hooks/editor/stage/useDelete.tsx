import { useSetRecoilState } from 'recoil';
import { stageClassesState, stagesState } from '../../../recoil/editor/atoms';
import { Stage, Shape } from '../../../types/editor';
import { Stage as StageClass } from '../../../utils/editor/shapes';
import { isSameStage } from '../../../utils/editor/validate';

function useDelete() {
  const setStagesOld = useSetRecoilState(stagesState);

  const setStages = useSetRecoilState(stageClassesState);

  const deleteStage2 = (stageToDelete: StageClass<Shape>) => {
    setStages(stages => stages.filter(stage => stage.id !== stageToDelete.id));
  };

  const deleteStage = (stageToDelete: Stage) => {
    setStagesOld(currentVal =>
      currentVal.filter(stage => !isSameStage(stage, stageToDelete))
    );
  };

  return { deleteStage, deleteStage2 };
}

export default useDelete;
