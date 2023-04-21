import { useSetRecoilState } from 'recoil';
import { stageClassesState } from '../../../recoil/editor/atoms';
import { Stage } from '../../../utils/editor/shapes';
import { replaceStage } from '../../../utils/editor/update2';

function useRemove() {
  const setStages = useSetRecoilState(stageClassesState);

  const removeNodes = (nodeIds: string[], stageToUpdate: Stage) => {
    setStages(stages =>
      replaceStage(
        stages,
        stageToUpdate.setChildren([
          ...stageToUpdate.children.filter(node => !nodeIds.includes(node.id)),
        ])
      )
    );
  };

  return {
    removeNodes,
  };
}

export default useRemove;
