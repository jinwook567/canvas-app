import { useSetRecoilState } from 'recoil';
import { stageClassesState } from '../../../recoil/editor/atoms';
import { Group, Stage } from '../../../utils/editor/shapes';

function useGroup() {
  const setStages = useSetRecoilState(stageClassesState);

  const group = (shapeIds: string[], stageId: string) => {
    setStages(stages =>
      stages.map(stage =>
        stage.id === stageId
          ? stage.setChildren([
              ...stage.children.filter(child => !shapeIds.includes(child.id)),
              new Group({}).setChildren(
                stage.children.filter(child => shapeIds.includes(child.id))
              ),
            ])
          : stage
      )
    );
  };

  const ungroup = (shapeId: string, stageId: string) => {
    const updateStage = (stage: Stage) =>
      stage.setChildren(
        stage.children.flatMap(child =>
          child.id === shapeId && child instanceof Group
            ? child.children.map(groupChild =>
                groupChild.setConfig({
                  ...groupChild.config,
                  x: groupChild.bounds.x * child.bounds.scaleX + child.bounds.x,
                  y: groupChild.bounds.y * child.bounds.scaleY + child.bounds.y,
                  scaleX: groupChild.bounds.scaleX * child.bounds.scaleX,
                  scaleY: groupChild.bounds.scaleY * child.bounds.scaleY,
                })
              )
            : child
        )
      );

    setStages(stages =>
      stages.map(stage => (stage.id === stageId ? updateStage(stage) : stage))
    );
  };

  return {
    group,
    ungroup,
  };
}

export default useGroup;
