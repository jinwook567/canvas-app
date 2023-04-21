import { useSetRecoilState } from 'recoil';
import { stageClassesState, stagesState } from '../../../recoil/editor/atoms';
import { Stage } from '../../../types/editor';
import { isSameStage } from '../../../utils/editor/validate';

function useDelete() {
  const setStagesOld = useSetRecoilState(stagesState);

  const setStages = useSetRecoilState(stageClassesState);

  const deleteStage2 = (stageId: string) => {
    setStages(stages => stages.filter(stage => stage.id !== stageId));
  };

  const deleteStage = (stageToDelete: Stage) => {
    setStagesOld(currentVal =>
      currentVal.filter(stage => !isSameStage(stage, stageToDelete))
    );
  };

  return { deleteStage, deleteStage2 };
}

export default useDelete;
