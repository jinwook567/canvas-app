import { useRecoilState } from 'recoil';
import { stagesState, workingStageIndexState } from '../recoil/editor';
import { KonvaStages, NodeArg } from '../types/editor';
import { createNode } from '../utils/editor';

function useEditor() {
  const [stages, setStages] = useRecoilState(stagesState);
  const [stageIndex, setStageIndex] = useRecoilState(workingStageIndexState);

  type StageIndex = typeof stageIndex;

  const handleAppendAssest = (nodeArg: NodeArg) => {
    const node = createNode(nodeArg);
    const newAttrs = stages.map((nodes, index) =>
      index === stageIndex ? [...nodes, node] : nodes
    );
    setStages(newAttrs);
  };

  const handleAppendStage = (targetIndex: StageIndex) => {
    if (targetIndex > stageIndex || targetIndex < 0) {
      throw new Error('wrong stageIndex');
    }

    const appendedStages = stages.reduce(
      (acc, cur, index) =>
        index === targetIndex ? [...acc, cur, []] : [...acc, cur],
      [] as KonvaStages
    );

    setStages(appendedStages);
    setStageIndex(targetIndex + 1);
  };

  const handleDeleteStage = (targetIndex: StageIndex) => {
    if (targetIndex === 0 && stages.length === 1) return;

    setStages(stages.filter((_, index) => index !== targetIndex));
    setStageIndex(targetIndex === stageIndex ? stageIndex - 1 : stageIndex);
  };

  return {
    handleAppendAssest,
    handleAppendStage,
    handleDeleteStage,
    stages,
    stageIndex,
  };
}

export default useEditor;
