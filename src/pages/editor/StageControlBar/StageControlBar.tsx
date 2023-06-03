import React from 'react';
import useAdd from '../../../hooks/editor/stage/useAdd';
import useRemove from '../../../hooks/editor/stage/useRemove';
import useSelect from '../../../hooks/editor/stage/useSelect';
import { nodeFactory, Stage } from '../../../utils/editor/node';
import ControlBar from '../../../components/editor/StageControlBar/StageControlBar';

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
      onAppendStage={() => {
        const stageToAdd = nodeFactory('stage').map(() => stage.config);
        addStage(stageToAdd, stage);
        selectStage(stageToAdd);
      }}
      onDeleteStage={() => {
        removeStage(stage);
        if (prevStage) selectStage(prevStage);
        if (nextStage) selectStage(nextStage);
      }}
      onSelectDown={nextStage && (() => selectStage(nextStage))}
      onSelectUp={prevStage && (() => selectStage(prevStage))}
    />
  );
}

export default StageControlBar;
