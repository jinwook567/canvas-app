import { useSetRecoilState } from 'recoil';
import { Props as TemplateType } from '../../../components/common/editor/Preview/Preview';
import { stageClassesState, stagesState } from '../../../recoil/editor/atoms';
import { Shape, Stage } from '../../../types/editor';
import { getResizeScale } from '../../../utils/editor/scale';
import { createStageSize, getSize } from '../../../utils/editor/size';
import { giveId } from '../node/useCreate';
import { updateStages } from '../../../utils/editor/update';
import { Stage as StageClass } from '../../../utils/editor/shapes';

function useTransform() {
  const setStagesOld = useSetRecoilState(stagesState);

  const setStages = useSetRecoilState(stageClassesState);

  function applyTemplate<ChildType extends Shape>(
    template: StageClass<ChildType>,
    stageToApply: StageClass<ChildType>
  ) {
    setStages(stages =>
      stages.map(stage =>
        stage.id === stageToApply.id ? template.duplicate() : stage
      )
    );
  }

  function transformSelectedStageByTemplate(
    template: TemplateType,
    stageToUpdate: Stage
  ) {
    setStagesOld(stages =>
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
