import { useSetRecoilState } from 'recoil';
import { stagesState } from '../../../recoil/editor/atoms';
import { Child } from '../../../utils/editor/node';
import S from '../../../utils/editor/stages';

function useTransform() {
  const setStages = useSetRecoilState(stagesState);

  const transformNodes = (nodes: Child[]) => {
    const update = (child: Child) => {
      const nodeToTransform = nodes.find(node => node.equals(child));
      return nodeToTransform || child;
    };
    setStages(S.map(stage => stage.mapChild(update)));
  };

  return {
    transformNodes,
  };
}

export default useTransform;
