import { useRecoilState, useRecoilValue } from 'recoil';
import {
  stageSizeState,
  stagesState,
  workingStageIndexState,
} from '../recoil/editor';
import { KonvaStages, NodeArg, StageIndex } from '../types/editor';
import { createNode } from '../utils/editor';

function useEditor() {
  const [stages, setStages] = useRecoilState(stagesState);
  const [stageIndex, setStageIndex] = useRecoilState(workingStageIndexState);
  const stageSize = useRecoilValue(stageSizeState);

  const handleAppendAssest = (nodeArg: NodeArg) => {
    const node = createNode({ nodeArg, stageSize });
    const newAttrs = stages.map((nodes, index) =>
      index === stageIndex ? [...nodes, node] : nodes
    );
    setStages(newAttrs);
  };

  const handleAppendStage = (targetIndex: StageIndex) => {
    if (targetIndex > stageIndex || targetIndex < 0) {
      throw new Error('wrong targetIndex range');
    }

    const appendedStages = stages.reduce(
      (acc, cur, index) =>
        index === targetIndex ? [...acc, cur, []] : [...acc, cur],
      [] as KonvaStages
    );

    setStages(appendedStages);
    setStageIndex(targetIndex + 1);
  };

  const checkTargetIndexInRange = (targetIndex: StageIndex) => {
    if (targetIndex >= stages.length || targetIndex < 0)
      throw new Error('wrong targetIndex range');
  };

  const handleDeleteStage = (targetIndex: StageIndex) => {
    if (stages.length === 1 && targetIndex === 0) return;
    checkTargetIndexInRange(targetIndex);

    setStages(stages.filter((_, index) => index !== targetIndex));

    setStageIndex(stageIndex === 0 ? 0 : stageIndex - 1);
  };

  const selectStage = (targetIndex: StageIndex) => {
    checkTargetIndexInRange(targetIndex);
    setStageIndex(targetIndex);
  };

  return {
    handleAppendAssest,
    handleAppendStage,
    handleDeleteStage,
    stages,
    stageIndex,
    selectStage,
    stageSize,
  };
}

export default useEditor;
