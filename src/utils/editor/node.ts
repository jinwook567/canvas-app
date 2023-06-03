import {
  Image as KonvaImage,
  Group as KonvaGroup,
  Stage as KonvaStage,
  Text as KonvaText,
} from 'react-konva';
import { NodeConfig } from 'konva/lib/Node';
import { IRect } from 'konva/lib/types';
import { ShapeConfig } from 'konva/lib/Shape';
import { GroupConfig } from 'konva/lib/Group';
import { TextConfig } from 'konva/lib/shapes/Text';
import { ContainerConfig } from 'konva/lib/Container';
import { clone, identity } from 'ramda';
import { createUniqueId } from '../unit';
import { DefaultSize, GroupSize, TextSize, ShapeBounds } from './size';

export type NodeType = 'image' | 'text' | 'group' | 'stage';
export type Node = Image | Text | Group | Stage;
export type Child = Exclude<Node, Stage>;

export function hasChildren(node: { type: NodeType }): node is Group | Stage {
  return node.type === 'group' || node.type === 'stage';
}

export function nodeFactory(type: NodeType): Node;
export function nodeFactory(type: 'image'): Image;
export function nodeFactory(type: 'text'): Text;
export function nodeFactory(type: 'group'): Group;
export function nodeFactory(type: 'stage'): Stage;
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

  equals(node: Node) {
    return this.id === node.id;
  }

  map(f: (config: T) => T) {
    const res = clone(this);
    res._config = f(clone(res._config));
    return res;
  }

  duplicate(): this {
    const node = nodeFactory(this.type) as unknown as this;
    const configUpdated = node.map(() => this._config);

    return hasChildren(configUpdated)
      ? configUpdated.mapChild(child => child.duplicate() as Child)
      : configUpdated;
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

  hasChild(child: Child) {
    return !!this.children.find(c => c.equals(child));
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

  iterChild<T>(f: (arg: Child) => T): T[] {
    return this._children.map(f);
  }

  get children() {
    return this.iterChild(identity);
  }
}

export class Image extends Base<
  ShapeConfig & { image?: CanvasImageSource; rect?: IRect }
> {
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
