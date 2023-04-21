import { useSetRecoilState } from 'recoil';
import { stageClassesState } from '../../../recoil/editor/atoms';

function useRemove() {
  const setStages = useSetRecoilState(stageClassesState);

  const removeNodes = (nodeIds: string[], stageId: string) => {
    setStages(stages =>
      stages.map(stage =>
        stage.id === stageId
          ? stage.setChildren([
              ...stage.children.filter(node => !nodeIds.includes(node.id)),
            ])
          : stage
      )
    );
  };

  return {
    removeNodes,
  };
}

export default useRemove;
