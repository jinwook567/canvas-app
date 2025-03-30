import { useSetRecoilState } from 'recoil';
import { stagesState } from 'old/recoils/editor/atoms';
import { Shape } from 'old/utils/editor/node';
import S from 'old/utils/editor/stages';

function useRemove() {
  const setStages = useSetRecoilState(stagesState);

  const removeNodes = (nodes: Shape[]) => {
    setStages(
      S.map(stage =>
        stage.filterChild(child => !nodes.find(node => node.equals(child)))
      )
    );
  };

  return {
    removeNodes,
  };
}

export default useRemove;
