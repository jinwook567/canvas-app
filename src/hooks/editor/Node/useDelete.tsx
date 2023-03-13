import { useRecoilState, useSetRecoilState } from 'recoil';
import { stagesState } from '../../../recoil/editor/atoms';
import { Node } from '../../../types/editor';
import {
  updateStageNodesWithReplacement,
  updateStages,
} from '../../../utils/editor/update';
import {
  findNodeById,
  findStageByNodeId,
} from '../../../utils/editor/validate';

function useDelete() {
  const [stages, setStages] = useRecoilState(stagesState);

  const canDeleteNode = (nodeIds: Node['id'][]) => {
    if (nodeIds.length === 0) return false;

    const nodes = nodeIds.map(nodeId => findNodeById(stages, nodeId));
    if (nodes.some(node => !node || node.config.lock)) return false;

    return true;
  };

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
