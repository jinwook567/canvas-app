import React from 'react';
import { ContainerConfig } from 'konva/lib/Container';
import useAdd from '../../../hooks/editor/stage/useAdd';
import useRemove from '../../../hooks/editor/stage/useRemove';
import useSelect from '../../../hooks/editor/stage/useSelect';
import { Stage } from '../../../utils/editor/shapes';
import ControlBar from '../../../components/editor/StageControlBar/StageControlBar';

type StageProps<T> = { config: ContainerConfig; children: T[]; id: string };

type Props<T> = {
  stage: StageProps<T>;
  prevStage?: StageProps<T>;
  nextStage?: StageProps<T>;
};

function StageControlBar<T>({ stage, prevStage, nextStage }: Props<T>) {
  const { selectStage } = useSelect();
  const { addStage } = useAdd();
  const { removeStage } = useRemove();

  return (
    <ControlBar
      onAppendStage={() => {
        const stageToAdd = new Stage({ ...stage.config });
        addStage(stageToAdd, stage.id);
        selectStage(stageToAdd.id);
      }}
      onDeleteStage={() => {
        removeStage(stage.id);
        if (prevStage) selectStage(prevStage.id);
        if (nextStage) selectStage(nextStage.id);
      }}
      onSelectDown={nextStage && (() => selectStage(nextStage.id))}
      onSelectUp={prevStage && (() => selectStage(prevStage.id))}
    />
  );
}

export default StageControlBar;
