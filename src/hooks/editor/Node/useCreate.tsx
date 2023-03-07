/* eslint-disable max-classes-per-file */
import _ from 'lodash';
import { useRecoilState } from 'recoil';
import { selectedStageState } from '../../../recoil/editor/selectors';
import {
  Group,
  Image,
  Node,
  Text,
  Size,
  NodeWithoutId,
  Stage,
} from '../../../types/editor';
import { getResizeScale } from '../../../utils/editor/scale';
import { createUniqueId } from '../../../utils/unit';
import { StageSize } from '../Stage/useCreate';

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
      return createLocatorBySize(node, new StageSize(stage).size)
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
    {
      width: createNodeSize(node).width,
      height: createNodeSize(node).height,
    },
    { width: targetSize.width, height: targetSize.height },
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

function createNodeSize(node: Node) {
  switch (node.type) {
    case 'image':
      return new ImageSize(node);

    case 'text':
      return new TextSize(node);

    case 'group':
      return new GroupSize(node);

    default:
      return new NodeSize(node);
  }
}

class NodeSize {
  _node: Node;

  constructor(node: Node) {
    this._node = node;
  }

  get x() {
    return this._node.config.x || 0;
  }

  get y() {
    return this._node.config.y || 0;
  }

  get scaleX() {
    return this._node.config.scaleX || 1;
  }

  get scaleY() {
    return this._node.config.scaleY || 1;
  }

  get width() {
    return this._node.config.width || 0;
  }

  get height() {
    return this._node.config.height || 0;
  }

  get actualWidth() {
    return this.width * this.scaleX;
  }

  get actualHeight() {
    return this.height * this.scaleY;
  }

  get minX() {
    return this.x;
  }

  get maxX() {
    return this.x + this.width;
  }

  get minY() {
    return this.y;
  }

  get maxY() {
    return this.y + this.height;
  }

  get node() {
    return this._node;
  }
}

class ImageSize extends NodeSize {
  _node: Image;

  constructor(node: Image) {
    super(node);
    this._node = node;
  }
}

class TextSize extends NodeSize {
  _node: Text;

  constructor(node: Text) {
    super(node);
    this._node = node;
  }

  get fontSize() {
    return this._node.config.fontSize || 0;
  }

  get text() {
    return this._node.config.text || '';
  }

  get width() {
    return this.fontSize * this.text.length;
  }

  get height() {
    return this.fontSize;
  }
}

class GroupSize extends NodeSize {
  _node: Group;

  constructor(node: Group) {
    super(node);
    this._node = node;
  }

  get minX(): number {
    return this._node.nodes.reduce(
      (acc, node) => Math.min(acc, createNodeSize(node).minX),
      0
    );
  }

  get maxX(): number {
    return this._node.nodes.reduce(
      (acc, node) => Math.max(acc, createNodeSize(node).maxX),
      0
    );
  }

  get minY(): number {
    return this._node.nodes.reduce(
      (acc, node) => Math.min(acc, createNodeSize(node).minY),
      0
    );
  }

  get maxY(): number {
    return this._node.nodes.reduce(
      (acc, node) => Math.max(acc, createNodeSize(node).maxY),
      0
    );
  }

  get width() {
    return this.maxX - this.minX;
  }

  get height() {
    return this.maxY - this.maxX;
  }
}

export default useCreate;
