/* eslint-disable max-classes-per-file */
import { Node, Image, Group, Text, Stage } from '../../types/editor';

export function createNodeSize(node: Node) {
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

export function createStageSize(stage: Stage) {
  return new StageSize(stage);
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

export class StageSize {
  _stage: Stage;

  constructor(stage: Stage) {
    this._stage = stage;
  }

  get width() {
    return this._stage.config.width || 0;
  }

  get height() {
    return this._stage.config.height || 0;
  }

  get scaleX() {
    return this._stage.config.scaleX || 1;
  }

  get scaleY() {
    return this._stage.config.scaleY || 1;
  }

  get size() {
    return { width: this.width, height: this.height };
  }
}
