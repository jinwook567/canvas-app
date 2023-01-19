import { useSetRecoilState } from 'recoil';
import { currentStageState } from '../recoil/editor';
import { KonvaTextConfig } from '../types/editor';

function useText() {
  const setCurrentStage = useSetRecoilState(currentStageState);

  const changeText = ({
    id,
    text,
  }: {
    id: KonvaTextConfig['id'];
    text: KonvaTextConfig['text'];
  }) => {
    setCurrentStage(currentStage =>
      currentStage.map(node => (node.id === id ? { ...node, text } : node))
    );
  };

  return { changeText };
}

export default useText;
