import { useSetRecoilState } from 'recoil';
import { stagesState } from '../../../recoil/editor/atoms';
import { Size, Stage } from '../../../types/editor';
import { getResizeScale } from '../../../utils/editor/scale';
import { createStageSize } from '../../../utils/editor/size';
import { createUniqueId } from '../../../utils/unit';
import useSelect from './useSelect';

const stageSizeRatioByDivSize = 0.8;

function useCreate() {
  const setStages = useSetRecoilState(stagesState);
  const { validateId, changeSelectWithoutValidate } = useSelect();

  function createStage(
    stageWithoutId: Omit<Stage, 'id'>,
    divSize: Size,
    stageId?: string
  ) {
    const stage = giveId(stageWithoutId);
    const scale = getResizeScale(
      createStageSize(stage).size,
      divSize,
      stageSizeRatioByDivSize
    );

    if (stageId && validateId(stageId)) {
      setStages(currentVal =>
        currentVal.reduce(
          (acc, cur) =>
            cur.id === stageId
              ? [...acc, cur, resizeStage(stage, scale)]
              : [...acc, cur],
          [] as Stage[]
        )
      );
    } else {
      setStages(currentVal => [...currentVal, resizeStage(stage, scale)]);
    }

    changeSelectWithoutValidate(stage.id);

    function resizeStage(stage: Stage, scale: number) {
      return {
        ...stage,
        config: {
          width: createStageSize(stage).width * scale,
          height: createStageSize(stage).height * scale,
        },
      };
    }
  }

  return {
    createStage,
  };
}

function giveId(stageWithoutId: Omit<Stage, 'id'>): Stage {
  return { ...stageWithoutId, id: createUniqueId() };
}

export default useCreate;
