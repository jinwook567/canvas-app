import { includes } from 'ramda';
import { useSetRecoilState } from 'recoil';
import { stagesState } from '../../../recoil/editor/atoms';
import { Shape, nodeFactory, Group } from '../../../utils/editor/node';
import S from '../../../utils/editor/stages';

function useGroup() {
  const setStages = useSetRecoilState(stagesState);

  const group = (nodes: Shape[]) => {
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
                ...node.iterChild(child =>
                  child.map(config => ({
                    ...config,
                    x: child.bounds.x * node.bounds.scaleX + node.bounds.x,
                    y: child.bounds.y * node.bounds.scaleY + node.bounds.y,
                    scaleX: child.bounds.scaleX * node.bounds.scaleX,
                    scaleY: child.bounds.scaleY * node.bounds.scaleY,
                  }))
                )
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
