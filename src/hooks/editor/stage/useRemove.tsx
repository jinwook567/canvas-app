import { useSetRecoilState } from 'recoil';
import { stageClassesState, stagesState } from '../../../recoil/editor/atoms';
import { Stage } from '../../../types/editor';
import { isSameStage } from '../../../utils/editor/validate';

function useRemove() {
  const setStagesOld = useSetRecoilState(stagesState);

  const setStages = useSetRecoilState(stageClassesState);

  const removeStage = (stageId: string) => {
    setStages(stages => stages.filter(stage => stage.id !== stageId));
  };

  const deleteStage = (stageToDelete: Stage) => {
    setStagesOld(currentVal =>
      currentVal.filter(stage => !isSameStage(stage, stageToDelete))
    );
  };

  return { deleteStage, removeStage };
}

export default useRemove;
