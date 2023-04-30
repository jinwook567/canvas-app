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
      template.bounds.originSize,
      stageToApply.bounds.originSize,
      1
    );

    const duplicated = template.duplicate().setConfig({
      ...template.config,
      width: scale * template.bounds.width,
      height: scale * template.bounds.height,
      scaleX: scale * template.bounds.scaleX,
      scaleY: scale * template.bounds.scaleY,
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
