import useCreate, { giveId } from '../../../../hooks/editor/stage/useCreate';
import useDelete from '../../../../hooks/editor/stage/useDelete';
import useSelect from '../../../../hooks/editor/stage/useSelect';
import { Stage } from '../../../../types/editor';
import { createStageSize } from '../../../../utils/editor/size';

function useListStageControlBar() {
  const { createStage } = useCreate();
  const { deleteStage } = useDelete();
  const { selectStage } = useSelect();

  const getControlBarProps = (stage: Stage) => ({
    onAppendStage: () => {
      const newStage = giveId({
        config: { ...createStageSize(stage).size },
        nodes: [],
      });
      createStage(newStage);
      selectStage(newStage);
    },
    onDeleteStage: () => deleteStage(stage),
  });

  return {
    getControlBarProps,
  };
}

export default useListStageControlBar;
