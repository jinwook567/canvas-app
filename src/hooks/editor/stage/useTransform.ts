import { useSetRecoilState } from 'recoil';
import { stagesState } from 'recoils/editor/atoms';
import { Stage } from 'utils/editor/node';
import S from 'utils/editor/stages';

function useTransform() {
  const setStages = useSetRecoilState(stagesState);

  function applyTemplate(template: Stage, stageToApply: Stage) {
    setStages(S.replace(stageToApply, template.duplicate()));
  }

  function transformStage(stageToTransform: Stage) {
    setStages(
      S.map(stage =>
        S.equals(stage, stageToTransform) ? stageToTransform : stage
      )
    );
  }

  return {
    applyTemplate,
    transformStage,
  };
}

export default useTransform;
