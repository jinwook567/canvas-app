import { useSetRecoilState } from 'recoil';
import { stageClassesState } from '../../../recoil/editor/atoms';
import { getResizeScale } from '../../../utils/editor/scale';
import { Stage as StageClass } from '../../../utils/editor/shapes';
import useSelect from './useSelect';

function useTransform() {
  const setStages = useSetRecoilState(stageClassesState);
  const { selectStage } = useSelect();

  function applyTemplate(template: StageClass, stageToApply: StageClass) {
    const scale = getResizeScale(
      template.bounds.size,
      stageToApply.bounds.size,
      1
    );

    const duplicated = template.duplicate().setConfig({
      ...template.config,
      scaleX: scale,
      scaleY: scale,
    });

    setStages(stages =>
      stages.map(stage => (stage.id === stageToApply.id ? duplicated : stage))
    );
    selectStage(duplicated.id);
  }

  return {
    applyTemplate,
  };
}

export default useTransform;
