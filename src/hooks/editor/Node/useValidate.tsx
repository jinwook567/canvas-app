import { useRecoilValue } from 'recoil';
import { stagesState } from '../../../recoil/editor/atoms';

function useValidate() {
  const stages = useRecoilValue(stagesState);

  const areNodesInSameStage = (nodeIds: string[]) =>
    nodeIds.every((nodeId, index) =>
      index === 0
        ? true
        : findStageByNodeId(nodeId) === findStageByNodeId(nodeIds[index - 1])
    );

  const findStageByNodeId = (nodeId: string) => {
    for (let i = 0; i < stages.length; i += 1) {
      for (let j = 0; j < stages[i].nodes.length; j += 1) {
        if (stages[i].nodes[j].id === nodeId) return stages[i];
      }
    }
    return null;
  };

  return {
    areNodesInSameStage,
    findStageByNodeId,
  };
}

export default useValidate;
