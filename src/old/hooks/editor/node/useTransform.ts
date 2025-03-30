import Konva from 'konva';
import { useSetRecoilState } from 'recoil';
import { stagesState } from 'old/recoils/editor/atoms';
import { Shape, isNode } from 'old/utils/editor/node';
import S from 'old/utils/editor/stages';

function useTransform() {
  const setStages = useSetRecoilState(stagesState);

  const handleNodes = (nodes: Shape[]) => {
    const update = (child: Shape) => {
      const nodeToTransform = nodes.find(node => node.equals(child));
      return nodeToTransform || child;
    };
    setStages(S.map(stage => stage.mapChild(update)));
  };

  const handleKonvaNodes = (nodes: Konva.Node[]) => {
    const update = (child: Shape) => {
      const node = nodes.find(node => node.id() === child.id);
      if (node) return child.map(config => ({ ...config, ...node.attrs }));
      return child;
    };
    setStages(S.map(stage => stage.mapChild(update)));
  };

  function notKonvaNode(nodes: Shape[] | Konva.Node[]): nodes is Shape[] {
    if (nodes.length === 0) return true;
    return isNode(nodes[0]);
  }

  const transformNodes = (nodes: Shape[] | Konva.Node[]) => {
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
