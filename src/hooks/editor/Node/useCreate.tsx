import _ from 'lodash';
import { useRecoilState } from 'recoil';
import { selectedStageState } from '../../../recoil/editor/selectors';
import { Node, Size, NodeWithoutId, Stage } from '../../../types/editor';
import { getResizeScale } from '../../../utils/editor/scale';
import {
  createNodeSize,
  createStageSize,
  getSize,
} from '../../../utils/editor/size';
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
        const newNode = _.cloneDeep(node);
        newNode.config.x = createNodeSize(newNode).x + 10;
        newNode.config.y = createNodeSize(newNode).y + 10;
        return avoidSamePos(newNode, stage);
      }
      return node;
    }
  }

  return {
    createNode,
  };
}

function giveId(node: NodeWithoutId): Node {
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
  const result = _.cloneDeep(node);
  result.config.scaleX = scale * createNodeSize(node).scaleX;
  result.config.scaleY = scale * createNodeSize(node).scaleY;
  return result;
}

function placeCenter(node: Node, targetSize: Size) {
  const result = _.cloneDeep(node);
  result.config.x = (targetSize.width - createNodeSize(node).actualWidth) / 2;
  result.config.y = (targetSize.height - createNodeSize(node).actualHeight) / 2;
  return result;
}

export default useCreate;
