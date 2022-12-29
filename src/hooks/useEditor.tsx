import { useRecoilState, useRecoilValue } from 'recoil';
import { stagesState, workingStageIndexState } from '../recoil/editor';
import { NodeArg } from '../types/editor';
import { createNode } from '../utils/editor';

function useEditor() {
  const [stages, setStages] = useRecoilState(stagesState);
  const stageIndex = useRecoilValue(workingStageIndexState);

  const handleAppendAssest = (nodeArg: NodeArg) => {
    const node = createNode(nodeArg);
    const newAttrs = stages.map((nodes, index) =>
      index === stageIndex ? [...nodes, node] : nodes
    );
    setStages(newAttrs);
  };

  return {
    handleAppendAssest,
  };
}

export default useEditor;
