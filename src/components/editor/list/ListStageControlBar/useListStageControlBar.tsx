import useCreate, { giveId } from '../../../../hooks/editor/stage/useCreate';
import useDelete from '../../../../hooks/editor/stage/useDelete';
import useSelect from '../../../../hooks/editor/stage/useSelect';
import { Stage } from '../../../../types/editor';
import { createStageSize } from '../../../../utils/editor/size';

function useListStageControlBar() {
  const { createStage } = useCreate();
  const { deleteStage } = useDelete();
  const { selectStage } = useSelect();

  const getControlBarProps = () => ({
    onAppendStage: (stage: Stage) => {
      const newStage = giveId({
        config: { ...createStageSize(stage).size },
        nodes: [],
      });
      createStage(newStage);
      selectStage(newStage.id);
    },
    onDeleteStage: ({
      prevStage,
      stage,
      nextStage,
    }: {
      prevStage?: Stage;
      stage: Stage;
      nextStage?: Stage;
    }) => {
      deleteStage(stage);

      if (nextStage) {
        selectStage(nextStage.id);
        return;
      }

      if (prevStage) {
        selectStage(prevStage.id);
      }
    },
  });

  return {
    getControlBarProps,
  };
}

export default useListStageControlBar;
