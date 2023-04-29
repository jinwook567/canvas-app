import { NodeConfig } from 'konva/lib/Node';
import { useSetRecoilState } from 'recoil';
import { stageClassesState } from '../../../recoil/editor/atoms';

function useTransform() {
  const setStages = useSetRecoilState(stageClassesState);

  const transformNodes = (
    data: { id: string; config: NodeConfig }[],
    stageId: string
  ) => {
    setStages(stages =>
      stages.map(stage =>
        stage.id === stageId
          ? stage.setChildren([
              ...data.reduce(
                (acc, cur) =>
                  acc.map(child =>
                    child.id === cur.id
                      ? child.setConfig({ ...cur.config })
                      : child
                  ),
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
