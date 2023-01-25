import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentStageState, stageSizeState } from '../recoil/editor';
import {
  arrangeSameShapeNode,
  createNodeConfig as createNodeConfigUtils,
} from '../utils/editor';
import {
  KonvaNodeConfig,
  KonvaStage,
  NodeArg,
  SelectedIds,
} from '../types/editor';

function useAsset() {
  const setCurrentStage = useSetRecoilState(currentStageState);
  const stageSize = useRecoilValue(stageSizeState);

  const createNodeConfig = (nodeArg: NodeArg) =>
    createNodeConfigUtils({ nodeArg, stageSize });

  const appendAsset = (nodeConfig: KonvaNodeConfig) => {
    setCurrentStage(currentStage => [
      ...currentStage,
      arrangeSameShapeNode({ currentStage, nodeConfig }),
    ]);
  };

  const deleteAsset = (selectedIds: SelectedIds) => {
    setCurrentStage(currentStage =>
      currentStage.filter(node => !selectedIds.includes(node.id))
    );
  };

  const applyTemplate = (nodes: KonvaStage) => {
    setCurrentStage(nodes);
  };

  return {
    appendAsset,
    deleteAsset,
    createNodeConfig,
    applyTemplate,
  };
}

export default useAsset;
