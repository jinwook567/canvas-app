/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
import React, { RefObject, useRef } from 'react';
import Konva from 'konva';
import {
  ImageConfig,
  Image as ImageComponentClass,
} from 'konva/lib/shapes/Image';
import { TextConfig, Text as TextComponentClass } from 'konva/lib/shapes/Text';
import { GroupConfig, Group as GroupComponentClass } from 'konva/lib/Group';
import { LayerConfig, Layer as LayerComponentClass } from 'konva/lib/Layer';
import { ContainerConfig } from 'konva/lib/Container';
import { Stage as StageComponentClass } from 'konva/lib/Stage';
import {
  Image as ImageComponent,
  Text as TextComponent,
  Group as GroupComponent,
  Layer as LayerComponent,
} from 'react-konva';
import { createUniqueId } from '../unit';

export interface RefConfig<RefType, ConfigType> {
  current: RefObject<RefType>['current'];
  config: ConfigType;
  id: string;
}

export interface Shape<Ref, Config> extends RefConfig<Ref, Config> {
  render: () => React.ReactElement;
}

class Ref<RefType, ConfigType> implements RefConfig<RefType, ConfigType> {
  protected _ref: RefObject<RefType>;

  private _id: string;

  protected _config: ConfigType;

  constructor(config: ConfigType) {
    this._ref = useRef<RefType>(null);
    this._config = config;
    this._id = createUniqueId();
  }

  get config() {
    return this._config;
  }

  set config(config: ConfigType) {
    this._config = config;
  }

  get id() {
    return this._id;
  }
}

export class Image
  extends Ref<Konva.Image, ImageConfig>
  implements Shape<Konva.Image, ImageConfig>
{
  render() {
    return <ImageComponent {...this.config} ref={this._ref} />;
  }

  get current() {
    return this._ref.current || new ImageComponentClass({ ...this.config });
  }
}

export class Text
  extends Ref<Konva.Text, TextConfig>
  implements Shape<Konva.Text, TextConfig>
{
  render() {
    return <TextComponent {...this.config} ref={this._ref} />;
  }

  get current() {
    return this._ref.current || new TextComponentClass({ ...this.config });
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

  get current() {
    return (
      this._ref.current ||
      new GroupComponentClass({ ...this.config }).add(...(this.children as any))
    );
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

  get current() {
    return (
      this._ref.current ||
      new LayerComponentClass({ ...this.config }).add(...(this.children as any))
    );
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

  get current() {
    return (
      this._ref.current ||
      new StageComponentClass({ ...this.config, container: '' })
    );
  }
}
