import { useSetRecoilState } from 'recoil';
import { stagesState } from '../../../recoil/editor/atoms';
import { Stage } from '../../../types/editor';
import { isSameStage } from '../../../utils/editor/validate';

function useDelete() {
  const setStages = useSetRecoilState(stagesState);

  const deleteStage = (stageToDelete: Stage) => {
    setStages(currentVal =>
      currentVal.filter(stage => isSameStage(stage, stageToDelete))
    );
  };

  return { deleteStage };
}

export default useDelete;
