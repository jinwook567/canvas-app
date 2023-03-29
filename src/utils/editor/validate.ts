import { Stage, Node } from '../../types/editor';

export const areNodesInSameStage = (stages: Stage[], nodeIds: string[]) =>
  nodeIds.every((nodeId, index) =>
    index === 0
      ? true
      : findStageByNodeId(stages, nodeId) ===
        findStageByNodeId(stages, nodeIds[index - 1])
  );

export const findStageByNodeId = (stages: Stage[], nodeId: string) =>
  stages.find(stage => stage.nodes.some(node => node.id === nodeId));

export const findNodeById = (stages: Stage[], nodeId: string) => {
  for (let i = 0; i < stages.length; i += 1) {
    const node = findNode(stages[i].nodes, nodeId);
    if (node) return node;
  }
  return undefined;
};

const findNode = (nodes: Node[], nodeId: string): Node | undefined => {
  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    if (node.id === nodeId) return nodes[i];
    if (node.type === 'group') {
      const childNode = findNode(node.nodes, nodeId);
      if (childNode) return childNode;
    }
  }
  return undefined;
};

export const isSameStage = (stage1: Stage, stage2: Stage) =>
  stage1.id === stage2.id;

export const isSameNode = (node1: Node, node2: Node) => node1.id === node2.id;
