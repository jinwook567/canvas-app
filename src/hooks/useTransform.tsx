import { useSetRecoilState } from 'recoil';
import { currentStageState } from '../recoil/editor';
import { TransformedNodes } from '../types/editor';

function useTransform() {
  const setCurrentStage = useSetRecoilState(currentStageState);

  const onTransformEnd = (transformedNodes: TransformedNodes) => {
    setCurrentStage(currentStage =>
      currentStage.map(node => {
        const transformedNode =
          transformedNodes.find(trNode => trNode.id === node.id) || {};
        return { ...node, ...transformedNode };
      })
    );
  };

  return { onTransformEnd };
}

export default useTransform;
