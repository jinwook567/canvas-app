import { Stage } from '../../types/editor';

export const areNodesInSameStage = (stages: Stage[], nodeIds: string[]) =>
  nodeIds.every((nodeId, index) =>
    index === 0
      ? true
      : findStageByNodeId(stages, nodeId) ===
        findStageByNodeId(stages, nodeIds[index - 1])
  );

export const findStageByNodeId = (stages: Stage[], nodeId: string) => {
  for (let i = 0; i < stages.length; i += 1) {
    for (let j = 0; j < stages[i].nodes.length; j += 1) {
      if (stages[i].nodes[j].id === nodeId) return stages[i];
    }
  }
  return null;
};
