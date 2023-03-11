import { Node, Stage } from '../../types/editor';

export const updateStagesItem = (stages: Stage[], stageToUpdate: Stage) =>
  stages.map(stage => (stage.id === stageToUpdate.id ? stageToUpdate : stage));

export const updateStageNodesWithReplacement = (
  stage: Stage,
  newNodes: Node[]
): Stage => ({
  ...stage,
  nodes: newNodes,
});

export const updateStageNodes = (
  stage: Stage,
  nodesToUpdate: Node[]
): Stage => ({
  ...stage,
  nodes: stage.nodes.map(
    node =>
      nodesToUpdate.find(nodeToUpdate => nodeToUpdate.id === node.id) || node
  ),
});

export const updateStageNode = (stage: Stage, nodeToUpdate: Node): Stage => ({
  ...stage,
  nodes: stage.nodes.map(node =>
    node.id === nodeToUpdate.id ? nodeToUpdate : node
  ),
});
