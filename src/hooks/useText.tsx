import { useSetRecoilState } from 'recoil';
import { currentStageState } from '../recoil/editor';
import { KonvaTextNode } from '../types/editor';

function useText() {
  const setCurrentStage = useSetRecoilState(currentStageState);

  const changeText = ({
    id,
    text,
  }: {
    id: KonvaTextNode['id'];
    text: KonvaTextNode['text'];
  }) => {
    setCurrentStage(currentStage =>
      currentStage.map(node => (node.id === id ? { ...node, text } : node))
    );
  };

  return { changeText };
}

export default useText;
