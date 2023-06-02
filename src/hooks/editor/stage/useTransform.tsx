import { useSetRecoilState } from 'recoil';
import { stagesState } from '../../../recoil/editor/atoms';
import { Stage } from '../../../utils/editor/node';
import S from '../../../utils/editor/stages';
import useSelect from './useSelect';

function useTransform() {
  const setStages = useSetRecoilState(stagesState);
  const { selectStage } = useSelect();

  function applyTemplate(template: Stage, stageToApply: Stage) {
    const duplicated = template.duplicate();

    setStages(S.replace(stageToApply, duplicated));
    selectStage(duplicated);
  }

  return {
    applyTemplate,
  };
}

export default useTransform;
