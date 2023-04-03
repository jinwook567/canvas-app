import { useSetRecoilState } from 'recoil';
import { Props as TemplateType } from '../../../components/common/editor/Preview/Preview';
import { stagesState } from '../../../recoil/editor/atoms';
import { Stage } from '../../../types/editor';
import { getResizeScale } from '../../../utils/editor/scale';
import { createStageSize, getSize } from '../../../utils/editor/size';
import { giveId } from '../node/useCreate';
import { updateStages } from '../../../utils/editor/update';

function useTransform() {
  const setStages = useSetRecoilState(stagesState);

  function transformSelectedStageByTemplate(
    template: TemplateType,
    stageToUpdate: Stage
  ) {
    setStages(stages =>
      updateStages(stages, {
        ...stageToUpdate,
        nodes: template.nodes.map(node => giveId(node)),
        config: {
          ...stageToUpdate.config,
          scaleX: getTemplateScale(template, stageToUpdate),
          scaleY: getTemplateScale(template, stageToUpdate),
        },
      })
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
