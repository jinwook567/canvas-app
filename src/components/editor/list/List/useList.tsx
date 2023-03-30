import { useEffect } from 'react';
import useCreate from '../../../../hooks/editor/stage/useCreate';
import useSelect from '../../../../hooks/editor/stage/useSelect';
import { Size, Stage } from '../../../../types/editor';
import { getResizeScale } from '../../../../utils/editor/scale';
import { createStageSize } from '../../../../utils/editor/size';

function useCreateInitialStage(
  currentStagesCount: number,
  stage: Stage,
  divSize: Size
) {
  const { createStage } = useCreate();
  const { selectStage } = useSelect();

  useEffect(() => {
    if (isSizeCalculated() && currentStagesCount === 0) {
      const scale = getResizeScale(createStageSize(stage), divSize, 0.8);
      const newStage = {
        ...stage,
        config: {
          ...stage.config,
          width: createStageSize(stage).width * scale,
          height: createStageSize(stage).height * scale,
        },
      };
      createStage(newStage);
      selectStage(newStage);
    }

    function isSizeCalculated() {
      return divSize.width !== 0 && divSize.height !== 0;
    }
  }, [divSize, currentStagesCount]);
}

export { useCreateInitialStage };
