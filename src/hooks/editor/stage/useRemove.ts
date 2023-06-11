import { useSetRecoilState } from 'recoil';
import { stagesState } from 'recoils/editor/atoms';
import { Stage } from 'utils/editor/node';
import S from 'utils/editor/stages';

function useRemove() {
  const setStages = useSetRecoilState(stagesState);

  const removeStage = (stageToRemove: Stage) => {
    setStages(S.filter(S.notEquals(stageToRemove)));
  };

  return { removeStage };
}

export default useRemove;
