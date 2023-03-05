import { useEffect } from 'react';
import useCreate from '../../../hooks/editor/Stage/useCreate';
import { Size, Stage } from '../../../types/editor';

function useList() {}

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
