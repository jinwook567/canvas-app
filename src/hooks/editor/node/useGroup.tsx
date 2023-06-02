import { includes } from 'ramda';
import { useSetRecoilState } from 'recoil';
import { stagesState } from '../../../recoil/editor/atoms';
import { Child, nodeFactory, Group } from '../../../utils/editor/node';
import S from '../../../utils/editor/stages';

function useGroup() {
  const setStages = useSetRecoilState(stagesState);

  const group = (nodes: Child[]) => {
    setStages(
      S.map(stage => {
        const groupNodes = nodes.filter(node => stage.hasChild(node));
        if (groupNodes.length === 0) return stage;

        const group = nodeFactory('group').addChild(...groupNodes);
        return stage
          .filterChild(child => !includes(child, groupNodes))
          .addChild(group);
      })
    );
  };

  const ungroup = (node: Group) => {
    setStages(
      S.map(stage =>
        stage.hasChild(node)
          ? stage
              .filterChild(child => !child.equals(node))
              .addChild(
                ...node.mapChild(child =>
                  child.map(config => ({
                    ...config,
                    x: node.bounds.x * child.bounds.scaleX + child.bounds.x,
                    y: node.bounds.y * child.bounds.scaleY + child.bounds.y,
                    scaleX: node.bounds.scaleX * child.bounds.scaleX,
                    scaleY: node.bounds.scaleY * child.bounds.scaleY,
                  }))
                ).children
              )
          : stage
      )
    );
  };

  return {
    group,
    ungroup,
  };
}

export default useGroup;
