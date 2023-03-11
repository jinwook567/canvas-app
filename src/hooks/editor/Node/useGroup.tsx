import { useSetRecoilState } from 'recoil';
import { stagesState } from '../../../recoil/editor/atoms';
import { Group, Node, Stage } from '../../../types/editor';
import { createNodeSize } from '../../../utils/editor/size';
import {
  updateNodeConfig,
  updateStageNodesWithReplacement,
  updateStages,
} from '../../../utils/editor/update';
import {
  areNodesInSameStage,
  findStageByNodeId,
} from '../../../utils/editor/validate';
import { createUniqueId } from '../../../utils/unit';

function useGroup() {
  const setStages = useSetRecoilState(stagesState);

  const canGroup = (nodeIds: string[]) => nodeIds.length >= 2;

  function group(nodeIds: string[]) {
    if (!canGroup(nodeIds))
      throw new Error('these nodes can not be group node');

    setStages(stages => {
      if (!areNodesInSameStage(stages, nodeIds))
        throw new Error('all nodes should be in the same stage');

      const stageToUpdate = stages.find(
        stage => stage === findStageByNodeId(stages, nodeIds[0])
      );
      if (!stageToUpdate) throw new Error('there is no stage to update');

      const index = findFirstIndex(stageToUpdate, nodeIds);

      const updatedStage = updateStageNodesWithReplacement(stageToUpdate, [
        ...getNotSelectedNodes(stageToUpdate.nodes, nodeIds).slice(0, index),
        createGroupNode(getSelectedNodes(stageToUpdate.nodes, nodeIds)),
        ...getNotSelectedNodes(stageToUpdate.nodes, nodeIds).slice(index),
      ]);

      return updateStages(stages, updatedStage);
    });

    function findFirstIndex(stage: Stage, nodeIds: Node['id'][]) {
      return nodeIds.reduce(
        (acc, nodeId) =>
          Math.min(
            stage.nodes.findIndex(_node => _node.id === nodeId),
            acc
          ),
        0
      );
    }

    function getSelectedNodes(nodes: Node[], nodeIds: string[]) {
      return nodes.filter(node => nodeIds.includes(node.id));
    }

    function getNotSelectedNodes(nodes: Node[], nodeIds: string[]) {
      return nodes.filter(node => !nodeIds.includes(node.id));
    }
  }

  function ungroup(nodeId: string) {
    setStages(stages => {
      const stageToUpdate = findStageByNodeId(stages, nodeId);
      if (!stageToUpdate) throw new Error('invalid node');

      const nodeToUpdate = stageToUpdate.nodes.find(node => node.id === nodeId);
      if (!nodeToUpdate || nodeToUpdate.type !== 'group')
        throw new Error('only group node can call this function');

      const updatedStage = updateStageNodesWithReplacement(
        stageToUpdate,
        stageToUpdate.nodes
          .map(node => (node === nodeToUpdate ? ungroupNode(node) : node))
          .flat()
      );

      return updateStages(stages, updatedStage);
    });

    function ungroupNode(node: Group) {
      const nodeSize = createNodeSize(node);
      return node.nodes.map(childNode => {
        const childNodeSize = createNodeSize(childNode);

        return updateNodeConfig(childNode, {
          x: childNodeSize.x * nodeSize.scaleX + nodeSize.x,
          y: childNodeSize.y * nodeSize.scaleY + nodeSize.y,
          scaleX: childNodeSize.scaleX * nodeSize.scaleX,
          scaleY: childNodeSize.scaleY * nodeSize.scaleY,
        });
      });
    }
  }

  return {
    group,
    ungroup,
    canGroup,
  };
}

function createGroupNode(nodes: Node[]): Group {
  return {
    type: 'group',
    nodes,
    config: {},
    id: createUniqueId(),
  };
}

export default useGroup;
