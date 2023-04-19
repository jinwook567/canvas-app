import { ContainerConfig } from 'konva/lib/Container';
import React from 'react';
import ControlBar from '../../common/editor/StageControlBar/StageControlBar';

type StageProps<T> = { config: ContainerConfig; children: T[]; id: string };

type Props<T> = {
  stage: StageProps<T>;
  prevStage?: StageProps<T>;
  nextStage?: StageProps<T>;
};

function StageControlBar<T>({ stage, prevStage, nextStage }: Props<T>) {
  const selectStage = (id: string) => '';
  const onAppendStage = (stage: any) => '';
  const onDeleteStage = (stage: any) => '';

  return (
    <ControlBar
      onAppendStage={() => onAppendStage(stage)}
      onDeleteStage={() => onDeleteStage({ prevStage, stage, nextStage })}
      onSelectDown={nextStage && (() => selectStage(nextStage.id))}
      onSelectUp={prevStage && (() => selectStage(prevStage.id))}
    />
  );
}

export default StageControlBar;
