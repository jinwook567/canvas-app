import Konva from 'konva';
import { useSetRecoilState } from 'recoil';
import { stagesState } from '../../../recoil/editor/atoms';
import { Node } from '../../../types/editor';
import {
  updateNodeConfig,
  updateStageNode,
  updateStages,
} from '../../../utils/editor/update';
import { findStageByNodeId } from '../../../utils/editor/validate';

function useTransform() {
  const setStages = useSetRecoilState(stagesState);

  function transformNodesConfig(
    data: { id: Node['id']; config: Konva.NodeConfig }[]
  ) {
    setStages(currentVal =>
      data.reduce((stages, { id, config }) => {
        const stageToUpdate = findStageByNodeId(currentVal, id);
        if (!stageToUpdate) throw new Error('invalid node');

        const nodeToUpdate = stageToUpdate.nodes.find(node => node.id === id);
        if (!nodeToUpdate) throw new Error('invalid node');

        const updatedStage = updateStageNode(
          stageToUpdate,
          updateNodeConfig(nodeToUpdate, config)
        );

        return updateStages(stages, updatedStage);
      }, currentVal)
    );
  }

  function transformNodes(nodes: Node[]) {
    setStages(currentVal =>
      nodes.reduce((stages, nodeToUpdate) => {
        const stageToUpdate = findStageByNodeId(stages, nodeToUpdate.id);
        if (!stageToUpdate) throw new Error('invalid node');

        const updatedStage = updateStageNode(stageToUpdate, nodeToUpdate);

        return updateStages(stages, updatedStage);
      }, currentVal)
    );
  }

  return {
    transformNodes,
    transformNodesConfig,
  };
}

export default useTransform;
