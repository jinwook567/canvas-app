import { useRecoilState, useRecoilValue } from 'recoil';
import { initialImageStageRatio } from '../constants/editor';
import {
  stageSizeState,
  stagesState,
  workingStageIndexState,
} from '../recoil/editor';
import { KonvaStages, NodeArg, StageIndex } from '../types/editor';
import { createNode, getInitialPosition } from '../utils/editor';

function useEditor() {
  const [stages, setStages] = useRecoilState(stagesState);
  const [stageIndex, setStageIndex] = useRecoilState(workingStageIndexState);
  const stageSize = useRecoilValue(stageSizeState);

  const handleAppendAssest = (nodeArg: NodeArg) => {
    const { x, y, width, height } = getInitialPosition({
      stageSize,
      nodeSize: { width: nodeArg.width, height: nodeArg.height },
      ratio: initialImageStageRatio,
    });
    const node = createNode({ ...nodeArg, x, y, width, height });
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
    if (targetIndex === 0 && stages.length === 1) return;
    checkTargetIndexInRange(targetIndex);

    setStages(stages.filter((_, index) => index !== targetIndex));
    setStageIndex(targetIndex === stageIndex ? stageIndex - 1 : stageIndex);
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
