import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  currentStageIndexState,
  stageCountState,
  stageListState,
} from '../recoil/editor';
import { KonvaStageList, StageIndex } from '../types/editor';
import useSelect from './useSelect';

function useStage() {
  const stageCount = useRecoilValue(stageCountState);
  const [currentStageIndex, setCurrentStageIndex] = useRecoilState(
    currentStageIndexState
  );
  const setStages = useSetRecoilState(stageListState);
  const { deselect } = useSelect();

  const checkTargetIndexInRange = (targetIndex: StageIndex) => {
    if (targetIndex >= stageCount || targetIndex < 0)
      throw new Error('wrong targetIndex range');
  };

  const selectStage = (targetIndex: StageIndex) => {
    checkTargetIndexInRange(targetIndex);
    setCurrentStageIndex(targetIndex);
  };

  const appendStage = (targetIndex: StageIndex) => {
    checkTargetIndexInRange(targetIndex);

    setStages(stages =>
      stages.reduce((acc, stage, index) => {
        acc.push(stage);
        if (index === targetIndex) acc.push([]);
        return acc;
      }, [] as KonvaStageList)
    );
    setCurrentStageIndex(targetIndex + 1);
  };

  const deleteStage = (targetIndex: StageIndex) => {
    if (stageCount === 1 && targetIndex === 0) return;
    checkTargetIndexInRange(targetIndex);

    setStages(stages => stages.filter((_, index) => index !== targetIndex));
    setCurrentStageIndex(targetIndex === 0 ? 0 : targetIndex - 1);
  };

  useEffect(() => {
    deselect();
  }, [currentStageIndex]);

  return {
    appendStage,
    deleteStage,
    selectStage,
    stageCount,
    currentStageIndex,
  };
}

export default useStage;
