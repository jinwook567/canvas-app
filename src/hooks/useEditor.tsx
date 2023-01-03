import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  selectedIdsState,
  stageSizeState,
  stagesState,
  workingStageIndexState,
} from '../recoil/editor';
import { KonvaNode, KonvaStages, NodeArg, StageIndex } from '../types/editor';
import { createNode } from '../utils/editor';

function useEditor() {
  const [stages, setStages] = useRecoilState(stagesState);
  const [stageIndex, setStageIndex] = useRecoilState(workingStageIndexState);
  const stageSize = useRecoilValue(stageSizeState);
  const [selectedIds, setSelectedIds] = useRecoilState(selectedIdsState);

  const handleAppendAssest = (nodeArg: NodeArg) => {
    const node = createNode({ nodeArg, stageSize });
    const newAttrs = stages.map((nodes, index) =>
      index === stageIndex ? [...nodes, node] : nodes
    );
    setStages(newAttrs);
  };

  const checkTargetIndexInRange = (targetIndex: StageIndex) => {
    if (targetIndex >= stages.length || targetIndex < 0)
      throw new Error('wrong targetIndex range');
  };

  const selectStage = (targetIndex: StageIndex) => {
    checkTargetIndexInRange(targetIndex);
    setStageIndex(targetIndex);
  };

  const handleAppendStage = (targetIndex: StageIndex) => {
    checkTargetIndexInRange(targetIndex);

    const appendedStages = stages.reduce(
      (acc, cur, index) =>
        index === targetIndex ? [...acc, cur, []] : [...acc, cur],
      [] as KonvaStages
    );

    setStages(appendedStages);
    setStageIndex(targetIndex + 1);
  };

  const handleDeleteStage = (targetIndex: StageIndex) => {
    if (stages.length === 1 && targetIndex === 0) return;
    checkTargetIndexInRange(targetIndex);

    setStages(stages.filter((_, index) => index !== targetIndex));
    setStageIndex(stageIndex === 0 ? 0 : stageIndex - 1);
  };

  const selectShape = ({
    id,
    type,
  }: {
    id: KonvaNode['id'];
    type: 'append' | 'change';
  }) => {
    setSelectedIds(
      type === 'append' ? ids => [...new Set([...ids, id])] : [id]
    );
  };

  const deselect = () => {
    setSelectedIds([]);
  };

  useEffect(() => {
    deselect();
  }, [stageIndex]);

  return {
    handleAppendAssest,
    handleAppendStage,
    handleDeleteStage,
    stages,
    stageIndex,
    selectStage,
    stageSize,
    selectedIds,
    selectShape,
    deselect,
  };
}

export default useEditor;
