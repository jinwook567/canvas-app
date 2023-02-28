/* eslint-disable max-classes-per-file */
import { Vector2d } from 'konva/lib/types';
import _ from 'lodash';
import { useRecoilState } from 'recoil';
import { selectedStageState } from '../../../recoil/editor/selectors';
import { Group, Image, Node, Text, Size } from '../../../types/editor';
import { createUniqueId } from '../../../utils/unit';

function useCreate() {
  const [selectedStage, setSelectedStage] = useRecoilState(selectedStageState);

  function createNode(node: Node) {
    if (!selectedStage) throw new Error('there is no selected stage');

    const stageSize = {
      width: selectedStage?.config.width || 0,
      height: selectedStage?.config.height || 0,
    };

    const newStage = _.cloneDeep(selectedStage);
    newStage.nodes.push(placeCenter(resize(node, stageSize), stageSize));
    setSelectedStage(newStage);
  }

  return {
    createNode,
  };
}

function resize(node: Node, targetSize: Size) {
  const scale = getResizeScale(
    {
      width: createNodeSize(node).width,
      height: createNodeSize(node).height,
    },
    { width: targetSize.width, height: targetSize.height }
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

function getResizeScale(targetSize: Size, standardSize: Size) {
  if (getRatio(targetSize) > getRatio(standardSize)) {
    return getScale(targetSize.width, standardSize.width / 3);
  }
  return getScale(targetSize.height, standardSize.height / 3);

  function getRatio(size: Size) {
    return size.width / size.height;
  }

  function getScale(target: number, standard: number) {
    return standard / target;
  }
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
  node: Node;

  constructor(node: Node) {
    this.node = node;
  }

  get x() {
    return this.node.config.x || 0;
  }

  get y() {
    return this.node.config.y || 0;
  }

  get scaleX() {
    return this.node.config.scaleX || 1;
  }

  get scaleY() {
    return this.node.config.scaleY || 1;
  }

  get width() {
    return this.node.config.width || 0;
  }

  get height() {
    return this.node.config.height || 0;
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
}

class ImageSize extends NodeSize {
  node: Image;

  constructor(node: Image) {
    super(node);
    this.node = node;
  }
}

class TextSize extends NodeSize {
  node: Text;

  constructor(node: Text) {
    super(node);
    this.node = node;
  }

  get fontSize() {
    return this.node.config.fontSize || 0;
  }

  get text() {
    return this.node.config.text || '';
  }

  get width() {
    return this.fontSize * this.text.length;
  }

  get height() {
    return this.fontSize;
  }
}

class GroupSize extends NodeSize {
  node: Group;

  constructor(node: Group) {
    super(node);
    this.node = node;
  }

  get minX(): number {
    return this.node.nodes.reduce(
      (acc, node) => Math.min(acc, createNodeSize(node).minX),
      0
    );
  }

  get maxX(): number {
    return this.node.nodes.reduce(
      (acc, node) => Math.max(acc, createNodeSize(node).maxX),
      0
    );
  }

  get minY(): number {
    return this.node.nodes.reduce(
      (acc, node) => Math.min(acc, createNodeSize(node).minY),
      0
    );
  }

  get maxY(): number {
    return this.node.nodes.reduce(
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

// 상호 관계를 파악하기 어렵기 때문에 중첩함수는 권장되지 않는다.
// 1. 적정한 사이즈로 변환시킨다.
// 2. 가운데 위치시킨다.
// 3. 만약 동일한 위치에 존재한다면, +10 만큼 이후에 위치시킨다.
// 4. 3을 재귀적으로 수행한다.

function getCenterPos() {}

export default useCreate;
