import { useSetRecoilState } from 'recoil';
import { stageClassesState } from '../../../recoil/editor/atoms';

function useRemove() {
  const setStages = useSetRecoilState(stageClassesState);

  const removeStage = (stageId: string) => {
    setStages(stages => stages.filter(stage => stage.id !== stageId));
  };

  return { removeStage };
}

export default useRemove;
