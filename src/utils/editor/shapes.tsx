/* eslint-disable max-classes-per-file */
import React from 'react';
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
  KonvaNodeEvents,
} from 'react-konva';
import { Shape, RefConfig } from '../../types/editor';
import { DefaultSize, GroupSize, TextSize } from './size2';
import { createUniqueId } from '../unit';

abstract class Ref<RefType, ConfigType>
  implements RefConfig<RefType, ConfigType>
{
  private _id: string;

  private _config: ConfigType;

  protected _node: RefType | null;

  constructor(config: ConfigType) {
    this._config = config;
    this._id = createUniqueId();
    this._node = null;
  }

  get config() {
    return this._config;
  }

  setConfig(config: ConfigType) {
    const result = _.clone(this);
    result._config = config;
    return result;
  }

  get id() {
    return this._id;
  }

  get node() {
    return this._node;
  }
}

export class Image
  extends Ref<Konva.Image, ImageConfig>
  implements Shape<Konva.Image, ImageConfig>
{
  render(events?: KonvaNodeEvents) {
    return (
      <ImageComponent
        {...this.config}
        ref={node => {
          this._node = node;
        }}
        {...events}
      />
    );
  }

  get bounds() {
    return new DefaultSize({ ...this.config });
  }

  duplicate() {
    return new Image({ ...this.config });
  }
}

export class Text
  extends Ref<Konva.Text, TextConfig>
  implements Shape<Konva.Text, TextConfig>
{
  render(events?: KonvaNodeEvents) {
    return (
      <TextComponent
        {...this.config}
        ref={node => {
          this._node = node;
        }}
        {...events}
      />
    );
  }

  get bounds() {
    return new TextSize({ ...this.config });
  }

  duplicate() {
    return new Text({ ...this.config });
  }
}

export class Group<ChildType extends Shape>
  extends Ref<Konva.Group, GroupConfig>
  implements Shape<Konva.Group, GroupConfig>
{
  children: ChildType[];

  constructor(config: GroupConfig, children: ChildType[]) {
    super(config);
    this.children = children;
  }

  render(events?: KonvaNodeEvents) {
    return (
      <GroupComponent
        {...this.config}
        ref={node => {
          this._node = node;
        }}
        {...events}
      >
        {this.children.map(child => child.render())}
      </GroupComponent>
    );
  }

  get bounds() {
    return new GroupSize({ ...this.config }, [...this.children]);
  }

  duplicate() {
    return new Group(
      { ...this.config },
      this.children.map(child => child.duplicate())
    );
  }
}

export class Layer<ChildType extends Shape>
  extends Ref<Konva.Layer, LayerConfig>
  implements Shape<Konva.Layer, LayerConfig>
{
  children: ChildType[];

  constructor(config: LayerConfig, children = [] as ChildType[]) {
    super(config);
    this.children = children;
  }

  render(events?: KonvaNodeEvents) {
    return (
      <LayerComponent
        {...this.config}
        ref={node => {
          this._node = node;
        }}
        {...events}
      >
        {this.children.map(child => child.render())}
      </LayerComponent>
    );
  }

  get bounds() {
    return new DefaultSize({ ...this.config });
  }

  duplicate() {
    return new Layer(
      { ...this.config },
      this.children.map(child => child.duplicate())
    );
  }
}

export class Stage<ChildType extends Shape = Shape> extends Ref<
  Konva.Stage,
  ContainerConfig
> {
  children: ChildType[];

  canvasLayer: Konva.Layer | null;

  constructor(config: ContainerConfig, children = [] as ChildType[]) {
    super(config);
    this.children = children;
    this.canvasLayer = null;
  }

  set node(value: Konva.Stage | null) {
    this._node = value;
  }

  duplicate() {
    return new Stage(
      { ...this.config },
      this.children.map(child => child.duplicate())
    );
  }
}
