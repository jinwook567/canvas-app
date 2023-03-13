import { useSetRecoilState } from 'recoil';
import { stagesState } from '../../../recoil/editor/atoms';
import { Node } from '../../../types/editor';
import {
  updateStageNodesWithReplacement,
  updateStages,
} from '../../../utils/editor/update';
import { findStageByNodeId } from '../../../utils/editor/validate';

function useDelete() {
  const setStages = useSetRecoilState(stagesState);

  const deleteNodes = (nodeIds: Node['id'][]) => {
    setStages(stages =>
      nodeIds.reduce((acc, nodeId) => {
        const stageToUpdate = findStageByNodeId(acc, nodeId);
        if (!stageToUpdate) throw new Error('invalid node');

        const updatedStage = updateStageNodesWithReplacement(
          stageToUpdate,
          stageToUpdate.nodes.filter(node => node.id !== nodeId)
        );

        return updateStages(acc, updatedStage);
      }, stages)
    );
  };

  return {
    deleteNodes,
    canDeleteNode,
  };
}

export default useDelete;
