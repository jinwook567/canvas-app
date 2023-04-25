import Konva from 'konva';
import { NodeConfig } from 'konva/lib/Node';
import { useSetRecoilState } from 'recoil';
import { stageClassesState } from '../../../recoil/editor/atoms';

function useTransform() {
  const setStages = useSetRecoilState(stageClassesState);

  const transformNodes = (
    data: { id: string; config?: NodeConfig; node?: Konva.Node }[],
    stageId: string
  ) => {
    setStages(stages =>
      stages.map(stage =>
        stage.id === stageId
          ? stage.setChildren([
              ...data.reduce(
                (acc, cur) =>
                  acc.map(child => {
                    if (child.id === cur.id) {
                      const newChild = child.clone();
                      if (cur.config) newChild.setConfig(cur.config);
                      if (cur.node) newChild.node = cur.node;
                      return newChild;
                    }
                    return child;
                  }),
                stage.children
              ),
            ])
          : stage
      )
    );
  };

  return {
    transformNodes,
  };
}

export default useTransform;
