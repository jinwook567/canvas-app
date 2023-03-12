import { useRecoilState } from 'recoil';
import { selectedStageState } from '../../../recoil/editor/selectors';
import { Node, Size, NodeWithoutId, Stage } from '../../../types/editor';
import { getResizeScale } from '../../../utils/editor/scale';
import {
  createNodeSize,
  createStageSize,
  getSize,
} from '../../../utils/editor/size';
import { updateNodeConfig } from '../../../utils/editor/update';
import { createUniqueId } from '../../../utils/unit';

function useCreate() {
  const [selectedStage, setSelectedStage] = useRecoilState(selectedStageState);

  function createNode(node: NodeWithoutId) {
    if (!selectedStage) throw new Error('there is no selected stage');

    setSelectedStage({
      ...selectedStage,
      nodes: [
        ...selectedStage.nodes,
        createLocator(giveId(node), selectedStage)
          .relocate()
          .avoidSamePos()
          .node(),
      ],
    });

    function createLocator(node: Node, stage: Stage) {
      return {
        node: () => node,
        relocate: () => createLocator(relocateNode(node, stage), stage),
        avoidSamePos: () => createLocator(avoidSamePos(node, stage), stage),
      };
    }

    function relocateNode(node: Node, stage: Stage) {
      return createLocatorBySize(node, createStageSize(stage).size)
        .resize(0.3)
        .placeCenter()
        .node();
    }

    function avoidSamePos(node: Node, stage: Stage): Node {
      if (
        stage.nodes.find(
          comparedNode =>
            createNodeSize(comparedNode).x === createNodeSize(node).x &&
            createNodeSize(comparedNode).y === createNodeSize(node).y &&
            createNodeSize(comparedNode).width === createNodeSize(node).width &&
            createNodeSize(comparedNode).height === createNodeSize(node).height
        )
      ) {
        return avoidSamePos(
          updateNodeConfig(node, {
            x: createNodeSize(node).x + 10,
            y: createNodeSize(node).y + 10,
          }),
          stage
        );
      }
      return node;
    }
  }

  return {
    createNode,
  };
}

export function giveId(node: NodeWithoutId): Node {
  if (node.type === 'group') {
    return {
      ...node,
      id: createUniqueId(),
      nodes: node.nodes.map(item => giveId(item)),
    };
  }
  return { ...node, id: createUniqueId() };
}

function createLocatorBySize(node: Node, size: Size) {
  return {
    node: () => node,
    resize: (ratio: number) =>
      createLocatorBySize(resize(node, size, ratio), size),
    placeCenter: () => createLocatorBySize(placeCenter(node, size), size),
  };
}

function resize(node: Node, targetSize: Size, ratio: number) {
  if (node.type === 'text') return node;

  const scale = getResizeScale(
    createNodeSize(node).size,
    getSize(targetSize.width, targetSize.height),
    ratio
  );
  return updateNodeConfig(node, {
    scaleX: scale * createNodeSize(node).scaleX,
    scaleY: scale * createNodeSize(node).scaleY,
  });
}

function placeCenter(node: Node, targetSize: Size) {
  return updateNodeConfig(node, {
    x: (targetSize.width - createNodeSize(node).actualWidth) / 2,
    y: (targetSize.height - createNodeSize(node).actualHeight) / 2,
  });
}

export default useCreate;
