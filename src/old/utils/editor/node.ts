import {
  Image as KonvaImage,
  Group as KonvaGroup,
  Stage as KonvaStage,
  Text as KonvaText,
  Circle as KonvaCircle,
  Rect as KonvaRect,
} from 'react-konva';
import { NodeConfig } from 'konva/lib/Node';
import { IRect } from 'konva/lib/types';
import { ShapeConfig } from 'konva/lib/Shape';
import { GroupConfig } from 'konva/lib/Group';
import { TextConfig } from 'konva/lib/shapes/Text';
import { ContainerConfig } from 'konva/lib/Container';
import { clone, identity, omit } from 'ramda';
import { createUniqueId } from 'shared/lib';
import {
  DefaultSize,
  GroupSize,
  TextSize,
  ShapeBounds,
} from 'old/utils/editor/size';
import { CircleConfig } from 'konva/lib/shapes/Circle';
import { RectConfig } from 'konva/lib/shapes/Rect';

export type NodeType = 'image' | 'text' | 'group' | 'stage' | 'circle' | 'rect';
export type Node = Image | Text | Group | Stage | Circle | Rect;
export type Shape = Exclude<Node, Stage>;

export function isNode(node: unknown) {
  return node instanceof Base;
}

export function hasChildren(node: Node): node is Group | Stage {
  return node instanceof Container;
}

export function isShape(node: Node): node is Shape {
  return node.type !== 'stage';
}

export function nodeFactory(type: NodeType): Node;
export function nodeFactory(type: 'image'): Image;
export function nodeFactory(type: 'text'): Text;
export function nodeFactory(type: 'group'): Group;
export function nodeFactory(type: 'stage'): Stage;
export function nodeFactory(type: 'circle'): Circle;
export function nodeFactory(type: 'rect'): Rect;
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

    case 'circle':
      return new Circle(type);

    case 'rect':
      return new Rect(type);

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
    res._config = omit(['id'], f(clone(this.config))) as T;
    return res;
  }

  duplicate(): this {
    const node = nodeFactory(this.type) as unknown as this;
    return node.map(() => this.config);
  }

  get config() {
    return this._config;
  }
}

abstract class Container<T extends NodeConfig> extends Base<T> {
  protected _children: Shape[];

  constructor(type: NodeType) {
    super(type);
    this._children = [];
  }

  addChild(...child: Shape[]): this {
    const res = clone(this);
    res._children.push(...child);
    return res;
  }

  setChildren(f: (children: Shape[]) => Shape[]) {
    const res = clone(this);
    res._children = f(this.children);
    return res;
  }

  hasChild(child: Shape) {
    return !!this.children.find(c => c.equals(child));
  }

  mapChild(f: (arg: Shape) => Shape): this {
    const res = clone(this);
    res._children = res._children.map(f);
    return res;
  }

  filterChild(f: (arg: Shape) => boolean): this {
    const res = clone(this);
    res._children = res._children.filter(f);
    return res;
  }

  iterChild<T>(f: (arg: Shape) => T): T[] {
    return this._children.map(f);
  }

  duplicate(): this {
    const duplicated = super.duplicate();
    return duplicated.addChild(...this.iterChild(child => child.duplicate()));
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

export class Group extends Container<GroupConfig> {
  get component() {
    return KonvaGroup;
  }

  get bounds(): ShapeBounds {
    return new GroupSize(this._config, this._children);
  }
}

export class Circle extends Base<CircleConfig> {
  get component() {
    return KonvaCircle;
  }

  get bounds() {
    return new DefaultSize(this._config);
  }
}

export class Rect extends Base<RectConfig> {
  get component() {
    return KonvaRect;
  }

  get bounds() {
    return new DefaultSize(this._config);
  }
}

export class Stage extends Container<ContainerConfig> {
  get component() {
    return KonvaStage;
  }

  get bounds() {
    return new DefaultSize(this._config);
  }
}
