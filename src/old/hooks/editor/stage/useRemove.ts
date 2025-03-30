import { useSetRecoilState } from 'recoil';
import { stagesState } from 'old/recoils/editor/atoms';
import { Stage } from 'old/utils/editor/node';
import S from 'old/utils/editor/stages';

function useRemove() {
  const setStages = useSetRecoilState(stagesState);

  const removeStage = (stageToRemove: Stage) => {
    setStages(S.filter(S.notEquals(stageToRemove)));
  };

  return { removeStage };
}

export default useRemove;
