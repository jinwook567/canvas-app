import {
  Image as KonvaImage,
  Group as KonvaGroup,
  Stage as KonvaStage,
  Text as KonvaText,
} from 'react-konva';
import { NodeConfig } from 'konva/lib/Node';
import { ImageConfig } from 'konva/lib/shapes/Image';
import { GroupConfig } from 'konva/lib/Group';
import { TextConfig } from 'konva/lib/shapes/Text';
import { ContainerConfig } from 'konva/lib/Container';
import { clone } from 'ramda';
import { createUniqueId } from '../unit';
import { DefaultSize, GroupSize, TextSize, ShapeBounds } from './size';

export type NodeType = 'image' | 'text' | 'group' | 'stage';
export type Node = Image | Text | Group | Stage;
export type Child = Exclude<Node, Stage>;

export function isImage(node: Node): node is Image {
  return node.type === 'image';
}

export function hasChildren(node: { type: NodeType }): node is Group | Stage {
  return node.type === 'group' || node.type === 'stage';
}

export function nodeFactory(type: NodeType): Node {
  switch (type) {
    case 'image':
      return new Image(type);

    case 'text':
      return new Text(type);

    case 'group':
      return new Group(type);

    case 'stage':
      return new Stage(type);

    default:
      throw new Error('잘못된 type을 생성하려고 합니다.');
  }
}

abstract class Base<T extends NodeConfig> {
  readonly id: string;

  readonly type: NodeType;

  protected _config: T;

  constructor(type: NodeType) {
    this.id = createUniqueId();
    this.type = type;
    this._config = {} as T;
  }

  map(f: (config: T) => T) {
    const res = clone(this);
    res._config = f(clone(res._config));
    return res;
  }

  duplicate() {
    const node = nodeFactory(this.type);
    return isImage(node)
      ? node.map(() => this._config as unknown as ImageConfig)
      : node.map(() => this._config);
  }

  get config() {
    return this._config;
  }
}

abstract class HasChildren<T extends NodeConfig> extends Base<T> {
  protected _children: Child[];

  constructor(type: NodeType) {
    super(type);
    this._children = [];
  }

  addChild(...child: Child[]): this {
    const res = clone(this);
    res._children.push(...child);
    return res;
  }

  mapChild(f: (arg: Child) => Child): this {
    const res = clone(this);
    res._children = res._children.map(f);
    return res;
  }

  filterChild(f: (arg: Child) => boolean): this {
    const res = clone(this);
    res._children = res._children.filter(f);
    return res;
  }

  reduceChild<T>(f: (acc: T, child: Child) => T, initialValue: T) {
    const res = clone(this);
    return res._children.reduce(f, initialValue);
  }

  duplicate(): Group | Stage {
    const node = nodeFactory(this.type) as Group | Stage;
    return node.mapChild(child => child.duplicate() as Child);
  }

  get children() {
    return this._children;
  }
}

export class Image extends Base<ImageConfig> {
  get component() {
    return KonvaImage;
  }

  get bounds() {
    return new DefaultSize(this._config);
  }
}

export class Text extends Base<TextConfig> {
  get component() {
    return KonvaText;
  }

  get bounds() {
    return new TextSize(this._config);
  }
}

export class Group extends HasChildren<GroupConfig> {
  get component() {
    return KonvaGroup;
  }

  get bounds(): ShapeBounds {
    return new GroupSize(this._config, this._children);
  }
}

export class Stage extends HasChildren<ContainerConfig> {
  get component() {
    return KonvaStage;
  }

  get bounds() {
    return new DefaultSize(this._config);
  }
}
