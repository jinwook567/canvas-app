import { useSetRecoilState } from 'recoil';
import { stagesState } from 'recoils/editor/atoms';
import { Shape } from 'utils/editor/node';
import S from 'utils/editor/stages';

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
