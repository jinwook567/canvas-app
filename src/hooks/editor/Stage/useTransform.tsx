import { useSetRecoilState } from 'recoil';
import { Props as TemplateType } from '../../../components/common/editor/Preview/Preview';
import { selectedStageState } from '../../../recoil/editor/selectors';
import { Stage } from '../../../types/editor';
import { getResizeScale } from '../../../utils/editor/scale';
import { createStageSize, getSize } from '../../../utils/editor/size';

function useTransform() {
  const setSelectedStage = useSetRecoilState(selectedStageState);

  function transformSelectedStageByTemplate(template: TemplateType) {
    setSelectedStage(currentVal =>
      currentVal
        ? {
            ...currentVal,
            nodes: template.nodes,
            config: {
              ...currentVal.config,
              scaleX: getTemplateScale(template, currentVal),
              scaleY: getTemplateScale(template, currentVal),
            },
          }
        : currentVal
    );

    function getTemplateScale(template: TemplateType, stage: Stage) {
      return getResizeScale(
        getSize(template.stageWidth, template.stageHeight),
        createStageSize(stage).size,
        1
      );
    }
  }

  return {
    transformSelectedStageByTemplate,
  };
}

export default useTransform;
