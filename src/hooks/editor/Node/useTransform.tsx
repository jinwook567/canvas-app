import Konva from 'konva';
import { useSetRecoilState } from 'recoil';
import { stagesState } from '../../../recoil/editor/atoms';
import { Node } from '../../../types/editor';
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

        const updatedStage = {
          ...stageToUpdate,
          nodes: stageToUpdate.nodes.map(node =>
            node === nodeToUpdate
              ? { ...node, config: { ...node.config, ...config } }
              : node
          ),
        };

        return stages.map(stage =>
          stage.id === updatedStage.id ? updatedStage : stage
        );
      }, currentVal)
    );
  }

  function transformNodes(nodes: Node[]) {
    setStages(currentVal =>
      nodes.reduce((stages, nodeToUpdate) => {
        const stageToUpdate = findStageByNodeId(stages, nodeToUpdate.id);
        if (!stageToUpdate) throw new Error('invalid node');

        const updatedStage = {
          ...stageToUpdate,
          nodes: stageToUpdate.nodes.map(node =>
            node.id === nodeToUpdate.id ? nodeToUpdate : node
          ),
        };

        return stages.map(stage =>
          stage.id === stageToUpdate.id ? updatedStage : stage
        );
      }, currentVal)
    );
  }

  return {
    transformNodes,
    transformNodesConfig,
  };
}

export default useTransform;
