import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  currentStageIndexState,
  stageCountState,
  stagesState,
} from '../recoil/editor';
import { KonvaStages, StageIndex } from '../types/editor';

function useStage() {
  const stageCount = useRecoilValue(stageCountState);
  const [currentStageIndex, setCurrentStageIndex] = useRecoilState(
    currentStageIndexState
  );
  const setStages = useSetRecoilState(stagesState);

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
        if (index === currentStageIndex) acc.push([]);
        return acc;
      }, [] as KonvaStages)
    );
    setCurrentStageIndex(targetIndex + 1);
  };

  const deleteStage = (targetIndex: StageIndex) => {
    if (stageCount === 1 && targetIndex === 0) return;
    checkTargetIndexInRange(targetIndex);

    setStages(stages =>
      stages.filter((_, index) => index !== currentStageIndex)
    );
    setCurrentStageIndex(currentStageIndex === 0 ? 0 : currentStageIndex - 1);
  };

  return {
    appendStage,
    deleteStage,
    selectStage,
    stageCount,
    currentStageIndex,
  };
}

export default useStage;
