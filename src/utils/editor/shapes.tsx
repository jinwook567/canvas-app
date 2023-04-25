/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
import Konva from 'konva';
import _ from 'lodash';
import { ImageConfig } from 'konva/lib/shapes/Image';
import { TextConfig } from 'konva/lib/shapes/Text';
import { GroupConfig } from 'konva/lib/Group';
import { LayerConfig } from 'konva/lib/Layer';
import { ContainerConfig } from 'konva/lib/Container';
import {
  Image as ImageComponent,
  Text as TextComponent,
  Group as GroupComponent,
  Layer as LayerComponent,
} from 'react-konva';
import { NodeConfig } from 'konva/lib/Node';
import { Shape, RefConfig } from '../../types/editor';
import { DefaultSize, GroupSize, TextSize } from './size';
import { createUniqueId } from '../unit';

abstract class Ref<RefType extends Konva.Node, ConfigType extends NodeConfig>
  implements RefConfig<RefType, ConfigType>
{
  private _id: string;

  private _config: ConfigType;

  protected _node: RefType | null;

  constructor(config: ConfigType) {
    this._id = createUniqueId();
    this._config = config;
    this._node = null;
  }

  clone() {
    return _.clone(this);
  }

  setConfig(config: ConfigType) {
    this._config = config;
    return this;
  }

  get config() {
    return this._config;
  }

  get id() {
    return this._id;
  }

  get node() {
    return this._node;
  }

  set node(node: RefType | null) {
    this._node = node;
  }
}

abstract class RefHasChildren<
  RefType extends Konva.Node,
  ConfigType extends NodeConfig,
  ChildType
> extends Ref<RefType, ConfigType> {
  _children: ChildType[];

  constructor(config: ConfigType) {
    super(config);
    this._children = [];
  }

  get children() {
    return this._children;
  }

  setChildren(children: ChildType[]) {
    this._children = children;
    return this;
  }
}

export class Image
  extends Ref<Konva.Image, ImageConfig>
  implements Shape<Konva.Image, ImageConfig>
{
  get bounds() {
    return new DefaultSize({ ...this.config });
  }

  get component() {
    return ImageComponent;
  }

  duplicate() {
    return new Image({ ...this.config });
  }
}

export class Text
  extends Ref<Konva.Text, TextConfig>
  implements Shape<Konva.Text, TextConfig>
{
  get bounds() {
    return new TextSize({ ...this.config });
  }

  get component() {
    return TextComponent;
  }

  duplicate() {
    return new Text({ ...this.config });
  }
}

type Child = Shape;

export class Group
  extends RefHasChildren<Konva.Group, GroupConfig, Child>
  implements Shape<Konva.Group, GroupConfig>
{
  get bounds() {
    return new GroupSize({ ...this.config }, [...this.children]);
  }

  get component() {
    return GroupComponent;
  }

  duplicate() {
    return new Group({ ...this.config }).setChildren(
      this.children.map(child => child.duplicate())
    );
  }
}

export class Layer
  extends RefHasChildren<Konva.Layer, LayerConfig, Shape>
  implements Shape<Konva.Layer, LayerConfig>
{
  get bounds() {
    return new DefaultSize({ ...this.config });
  }

  get component() {
    return LayerComponent;
  }

  duplicate() {
    return new Layer({ ...this.config }).setChildren(
      this.children.map(child => child.duplicate())
    );
  }
}

export class Stage extends RefHasChildren<Konva.Stage, ContainerConfig, Child> {
  canvasNode: Konva.Layer | null;

  constructor(config: ContainerConfig) {
    super(config);
    this.canvasNode = null;
  }

  set node(value: Konva.Stage | null) {
    this._node = value;
  }

  get bounds() {
    return new DefaultSize({ ...this.config });
  }

  duplicate() {
    return new Stage({ ...this.config }).setChildren(
      this.children.map(child => child.duplicate())
    );
  }
}
