import Konva from 'konva';
import _ from 'lodash';
import { useSetRecoilState } from 'recoil';
import { stagesState } from '../../../recoil/editor/atoms';
import { Node, Stage } from '../../../types/editor';
import { findStageByNodeId } from '../../../utils/editor/validate';

function useTransform() {
  const setStages = useSetRecoilState(stagesState);

  function transformNodesConfig(
    data: { id: Node['id']; config: Konva.NodeConfig }[]
  ) {
    setStages(currentVal =>
      data.reduce((stages, { id, config }) => {
        const stage = findStageByNodeId(currentVal, id);
        if (!stage) throw new Error('invalide node');

        const newStage = replaceConfig(stage, { id, config });
        return stages.map(stage =>
          stage.id === newStage.id ? newStage : stage
        );
      }, currentVal)
    );
  }

  function replaceConfig(
    stage: Stage,
    data: { id: Node['id']; config: Konva.NodeConfig }
  ): Stage {
    const node = stage.nodes.find(node => node.id === data.id);
    if (!node) return stage;

    const newNode = _.cloneDeep(node);
    newNode.config = { ...newNode.config, ...data.config };
    return replaceNode(stage, newNode);
  }

  function transformNodes(stageId: string, nodes: Node[]) {
    setStages(currentVal =>
      currentVal.map(stage =>
        stage.id === stageId
          ? nodes.reduce(
              (acc, node) =>
                checkNodeExist(acc, node.id) ? replaceNode(acc, node) : acc,
              stage
            )
          : stage
      )
    );
  }

  return {
    transformNodes,
    transformNodesConfig,
  };
}

function checkNodeExist(stage: Stage, nodeId: string) {
  if (stage.nodes.find(_node => _node.id === nodeId)) return true;
  throw new Error('there is no node given id');
}

function replaceNode(stage: Stage, node: Node) {
  return {
    ...stage,
    nodes: stage.nodes.map(_node => (_node.id === node.id ? node : _node)),
  };
}

export default useTransform;
