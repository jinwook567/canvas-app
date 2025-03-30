import { useSetRecoilState } from 'recoil';
import { stagesState } from 'old/recoils/editor/atoms';
import { Stage } from 'old/utils/editor/node';
import S, { Stages } from 'old/utils/editor/stages';

function useAdd() {
  const setStages = useSetRecoilState(stagesState);

  const addStage = (stageToAdd: Stage, addAfterThisStage?: Stage) => {
    if (addAfterThisStage) {
      setStages(
        S.reduce(
          (acc, stage) =>
            S.equals(stage, addAfterThisStage)
              ? S.add(stage, stageToAdd)(acc as Stages)
              : S.add(stage)(acc as Stages),
          []
        )
      );
    } else {
      setStages(S.add(stageToAdd));
    }
  };

  return {
    addStage,
  };
}

export default useAdd;
