import { useSetRecoilState } from 'recoil';
import { stagesState } from 'recoils/editor/atoms';
import { Stage } from 'utils/editor/node';
import S from 'utils/editor/stages';

function useTransform() {
  const setStages = useSetRecoilState(stagesState);

  function applyTemplate(template: Stage, stageToApply: Stage) {
    setStages(S.replace(stageToApply, template.duplicate()));
  }

  return {
    applyTemplate,
  };
}

export default useTransform;
