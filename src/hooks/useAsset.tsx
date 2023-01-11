import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentStageState, stageSizeState } from '../recoil/editor';
import { arrangeSameShapeNode, createNode } from '../utils/editor';
import { NodeArg, SelectedIds } from '../types/editor';

function useAsset() {
  const setCurrentStage = useSetRecoilState(currentStageState);
  const stageSize = useRecoilValue(stageSizeState);

  const appendAsset = (nodeArg: NodeArg) => {
    const node = createNode({ nodeArg, stageSize });

    setCurrentStage(currentStage => [
      ...currentStage,
      arrangeSameShapeNode({ currentStage, node }),
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
  };
}

export default useAsset;
