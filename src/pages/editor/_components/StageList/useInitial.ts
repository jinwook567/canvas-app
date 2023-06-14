import useAdd from 'hooks/editor/stage/useAdd';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { stagesState } from 'recoils/editor/atoms';
import { nodeFactory } from 'utils/editor/node';

function useCreateInitialStage() {
  const stages = useRecoilValue(stagesState);
  const { addStage } = useAdd();

  useEffect(() => {
    if (stages.length === 0)
      addStage(nodeFactory('stage').map(() => ({ width: 500, height: 500 })));
  }, [stages]);

  return stages;
}

export default useCreateInitialStage;
