import { MutableRefObject, useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  selectedIdsState,
  stageSizeState,
  stagesState,
  currentStageIndexState,
  currentStageState,
} from '../recoil/editor';
import {
  IsPressedKey,
  KonvaNode,
  KonvaStage,
  KonvaStages,
  NodeArg,
  SelectedIds,
  StageIndex,
  TransformedNodes,
} from '../types/editor';
import {
  arrangeSameShapeNode,
  createGroupNode,
  createNode,
} from '../utils/editor';
import useAsset from './useAsset';
import useGroup from './useGroup';
import useSelect from './useSelect';
import useStage from './useStage';

function useEditor() {
  const [stages, setStages] = useRecoilState(stagesState);
  const [currentStageIndex, setCurrentStageIndex] = useRecoilState(
    currentStageIndexState
  );
  const [stageSize, setStageSize] = useRecoilState(stageSizeState);

  const [selectedIds, setSelectedIds] = useRecoilState(selectedIdsState);
  const currentStage = useRecoilValue(currentStageState);

  const handleChangeCurrentStage = (newStage: KonvaStage) => {
    const newStages = stages.map((stage, index) =>
      index === currentStageIndex ? newStage : stage
    );
    setStages(newStages);
  };

  const handleTransformNodes = (transformedNodes: TransformedNodes[]) => {
    const newStage = currentStage.map(node => {
      const transformedNode = transformedNodes.find(
        trNode => trNode.id === node.id
      );
      return transformedNode ? { ...node, ...transformedNode } : node;
    });
    handleChangeCurrentStage(newStage);
  };

  return {
    stages,
    setStages,
    currentStage,
    stageSize,
    setStageSize,
    selectedIds,
    handleTransformNodes,
    ...useStage(),
    ...useAsset(),
    ...useSelect(),
    ...useGroup(),
  };
}

export default useEditor;
