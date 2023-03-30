import React from 'react';
import useSelect from '../../../../hooks/editor/stage/useSelect';
import { Stage } from '../../../../types/editor';
import StageControlBar from '../../../common/editor/StageControlBar/StageControlBar';
import useListStageControlBar from './useListStageControlBar';

type Props = {
  stage: Stage;
  prevStage?: Stage;
  nextStage?: Stage;
};

function ListStageControlBar({ stage, prevStage, nextStage }: Props) {
  const { getControlBarProps } = useListStageControlBar();
  const { selectStage } = useSelect();
  const { onAppendStage, onDeleteStage } = getControlBarProps();

  return (
    <StageControlBar
      onAppendStage={() => onAppendStage(stage)}
      onDeleteStage={() => onDeleteStage({ prevStage, stage, nextStage })}
      onSelectDown={nextStage && (() => selectStage(nextStage))}
      onSelectUp={prevStage && (() => selectStage(prevStage))}
    />
  );
}

export default ListStageControlBar;
