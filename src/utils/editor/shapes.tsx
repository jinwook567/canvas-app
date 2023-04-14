/* eslint-disable max-classes-per-file */
import React, { RefObject, useRef } from 'react';
import Konva from 'konva';
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
import { Shape, RefConfig } from '../../types/editor';
import { DefaultSize, GroupSize, TextSize } from './size2';
import { createUniqueId } from '../unit';

abstract class Ref<RefType, ConfigType>
  implements RefConfig<RefType, ConfigType>
{
  protected _ref: RefObject<RefType>;

  private _id: string;

  private _config: ConfigType;

  constructor(config: ConfigType) {
    this._ref = useRef<RefType>(null);
    this._config = config;
    this._id = createUniqueId();
  }

  get config() {
    return this._config;
  }

  get id() {
    return this._id;
  }

  get current() {
    if (!this._ref.current) throw new Error('cannot use before render');
    return this._ref.current;
  }
}

export class Image
  extends Ref<Konva.Image, ImageConfig>
  implements Shape<Konva.Image, ImageConfig>
{
  render() {
    return <ImageComponent {...this.config} ref={this._ref} />;
  }

  get bounds() {
    return new DefaultSize({ ...this.config });
  }
}

export class Text
  extends Ref<Konva.Text, TextConfig>
  implements Shape<Konva.Text, TextConfig>
{
  render() {
    return <TextComponent {...this.config} ref={this._ref} />;
  }

  get bounds() {
    return new TextSize({ ...this.config });
  }
}

export class Group<ChildType extends Shape<unknown, unknown>>
  extends Ref<Konva.Group, GroupConfig>
  implements Shape<Konva.Group, GroupConfig>
{
  children: ChildType[];

  constructor(config: GroupConfig, children: ChildType[]) {
    super(config);
    this.children = children;
  }

  render() {
    return (
      <GroupComponent {...this.config} ref={this._ref}>
        {this.children.map(child => child.render())}
      </GroupComponent>
    );
  }

  get bounds() {
    return new GroupSize({ ...this.config }, [...this.children]);
  }
}

export class Layer<ChildType extends Shape<unknown, unknown>>
  extends Ref<Konva.Layer, LayerConfig>
  implements Shape<Konva.Layer, LayerConfig>
{
  children: ChildType[];

  constructor(config: LayerConfig, children = [] as ChildType[]) {
    super(config);
    this.children = children;
  }

  render() {
    return (
      <LayerComponent {...this.config} ref={this._ref}>
        {this.children.map(child => child.render())}
      </LayerComponent>
    );
  }

  get bounds() {
    return new DefaultSize({ ...this.config });
  }
}

export class Stage<ChildType extends Shape<unknown, unknown>> extends Ref<
  Konva.Stage,
  ContainerConfig
> {
  children: ChildType[];

  _ref: RefObject<Konva.Stage>;

  _canvasRef: RefObject<Konva.Layer>;

  constructor(config: ContainerConfig, children = [] as ChildType[]) {
    super(config);
    this.children = children;
    this._ref = useRef<Konva.Stage>(null);
    this._canvasRef = useRef<Konva.Layer>(null);
  }
}
