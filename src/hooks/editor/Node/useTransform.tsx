import { useSetRecoilState } from 'recoil';
import { stagesState } from '../../../recoil/editor/atoms';
import { Node, Stage } from '../../../types/editor';

function useTransform() {
  const setStages = useSetRecoilState(stagesState);

  function transformNodes(stageId: string, nodes: Node[]) {
    setStages(currentVal =>
      currentVal.map(stage =>
        stage.id === stageId
          ? nodes.reduce(
              (acc, node) =>
                validateNode(acc, node) ? replaceNode(acc, node) : acc,
              stage
            )
          : stage
      )
    );
  }

  return {
    transformNodes,
  };
}

function validateNode(stage: Stage, node: Node) {
  if (stage.nodes.find(_node => _node.id === node.id)) return true;
  throw new Error('invalid node');
}

function replaceNode(stage: Stage, node: Node) {
  return {
    ...stage,
    nodes: stage.nodes.map(_node => (_node.id === node.id ? node : _node)),
  };
}

export default useTransform;
