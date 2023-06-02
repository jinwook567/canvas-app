import { useSetRecoilState } from 'recoil';
import { stagesState } from '../../../recoil/editor/atoms';
import { Child } from '../../../utils/editor/node';
import S from '../../../utils/editor/stages';

function useRemove() {
  const setStages = useSetRecoilState(stagesState);

  const removeNodes = (nodes: Child[]) => {
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
