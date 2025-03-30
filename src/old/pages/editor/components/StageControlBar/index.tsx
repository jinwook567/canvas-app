import React from 'react';
import useAdd from 'old/hooks/editor/stage/useAdd';
import useRemove from 'old/hooks/editor/stage/useRemove';
import useSelect from 'old/hooks/editor/stage/useSelect';
import { nodeFactory, Stage } from 'old/utils/editor/node';
import ControlBar from 'entities/stage/ui/Panel';

type Props = {
  stage: Stage;
  prevStage?: Stage;
  nextStage?: Stage;
};

function StageControlBar({ stage, prevStage, nextStage }: Props) {
  const { selectStage } = useSelect();
  const { addStage } = useAdd();
  const { removeStage } = useRemove();

  return (
    <ControlBar
      onCreate={() =>
        addStage(
          nodeFactory('stage').map(() => stage.config),
          stage
        )
      }
      onDelete={() => removeStage(stage)}
      onNext={nextStage && (() => selectStage(nextStage))}
      onPrev={prevStage && (() => selectStage(prevStage))}
    />
  );
}

export default StageControlBar;
