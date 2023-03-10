import { Stage } from '../../types/editor';

export const areNodesInSameStage = (stages: Stage[], nodeIds: string[]) =>
  nodeIds.every((nodeId, index) =>
    index === 0
      ? true
      : findStageByNodeId(stages, nodeId) ===
        findStageByNodeId(stages, nodeIds[index - 1])
  );

export const findStageByNodeId = (stages: Stage[], nodeId: string) =>
  stages.find(stage => stage.nodes.some(node => node.id === nodeId));
