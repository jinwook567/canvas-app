import Konva from 'konva';
import { useSetRecoilState } from 'recoil';
import { stagesState } from '../../../recoil/editor/atoms';
import { Child, isNode } from '../../../utils/editor/node';
import S from '../../../utils/editor/stages';

function useTransform() {
  const setStages = useSetRecoilState(stagesState);

  const handleNodes = (nodes: Child[]) => {
    const update = (child: Child) => {
      const nodeToTransform = nodes.find(node => node.equals(child));
      return nodeToTransform || child;
    };
    setStages(S.map(stage => stage.mapChild(update)));
  };

  const handleKonvaNodes = (nodes: Konva.Node[]) => {
    const update = (child: Child) => {
      const node = nodes.find(node => node.id() === child.id);
      if (node) return child.map(config => ({ ...config, ...node.attrs }));
      return child;
    };
    setStages(S.map(stage => stage.mapChild(update)));
  };

  function notKonvaNode(nodes: Child[] | Konva.Node[]): nodes is Child[] {
    if (nodes.length === 0) return true;
    return isNode(nodes[0]);
  }

  const transformNodes = (nodes: Child[] | Konva.Node[]) => {
    if (notKonvaNode(nodes)) {
      handleNodes(nodes);
    } else {
      handleKonvaNodes(nodes);
    }
  };

  return {
    transformNodes,
  };
}

export default useTransform;
