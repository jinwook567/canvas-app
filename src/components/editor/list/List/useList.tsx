import { useEffect } from 'react';
import useCreate from '../../../../hooks/editor/stage/useCreate';
import useSelect from '../../../../hooks/editor/stage/useSelect';
import { Size, Stage } from '../../../../types/editor';

function useList() {
  const { isSelected, selectStage } = useSelect();
  const getStageWrapperProps = (stage: Stage) => ({
    isSelected: isSelected(stage),
    onSelect: () => selectStage(stage),
  });

  return {
    getStageWrapperProps,
  };
}

function useCreateInitialStage(stages: Stage[], divSize: Size) {
  const { createStage } = useCreate();

  useEffect(() => {
    if (isSizeCalculated() && stages.length === 0)
      createStage({ config: { width: 500, height: 500 }, nodes: [] }, divSize);

    function isSizeCalculated() {
      return divSize.width !== 0 && divSize.height !== 0;
    }
  }, [divSize, stages]);
}

export default useList;
export { useCreateInitialStage };
