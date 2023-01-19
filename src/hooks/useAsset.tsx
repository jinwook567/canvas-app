import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentStageState, stageSizeState } from '../recoil/editor';
import {
  arrangeSameShapeNode,
  createNodeConfig as createNodeConfigUtils,
} from '../utils/editor';
import { KonvaNodeConfig, NodeArg, SelectedIds } from '../types/editor';

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

  return {
    appendAsset,
    deleteAsset,
    createNodeConfig,
  };
}

export default useAsset;
