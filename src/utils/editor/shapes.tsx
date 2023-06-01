import _ from 'lodash';
import { ImageConfig } from 'konva/lib/shapes/Image';
import { TextConfig } from 'konva/lib/shapes/Text';
import { GroupConfig } from 'konva/lib/Group';
import {
  KonvaNodeComponent,
  Image as ImageComponent,
  Text as TextComponent,
  Group as GroupComponent,
  Layer as LayerComponent,
  Stage as StageComponent,
} from 'react-konva';
import { LayerConfig } from 'konva/lib/Layer';
import { ContainerConfig } from 'konva/lib/Container';
import { NodeConfig } from 'konva/lib/Node';
import { Shape } from '../../types/editor';
import { DefaultSize, GroupSize, TextSize, ShapeBounds } from './size';
import { createUniqueId } from '../unit';

abstract class Base<ConfigType extends NodeConfig>
  implements Shape<ConfigType>
{
  readonly id: string;

  private _config: ConfigType;

  constructor(config: ConfigType) {
    this.id = createUniqueId();
    this._config = config;
  }

  setConfig(config: ConfigType) {
    const result = _.clone(this);
    result._config = config;
    return result;
  }

  get config() {
    return this._config;
  }

  abstract get bounds(): ShapeBounds;
  abstract duplicate(): Shape<ConfigType>;
  abstract get component(): KonvaNodeComponent<any, any>;
}

abstract class BaseHasChildren<
  Config extends NodeConfig,
  Child
> extends Base<Config> {
  _children: Child[];

  constructor(config: Config) {
    super(config);
    this._children = [];
  }

  get children() {
    return this._children;
  }

  setChildren(children: Child[]) {
    const result = _.clone(this);
    result._children = children;
    return result;
  }
}

type Child = Shape<any>;

export class Image extends Base<ImageConfig> {
  get bounds() {
    return new DefaultSize({ ...this.config });
  }

  duplicate() {
    return new Image({ ...this.config });
  }

  get component() {
    return ImageComponent;
  }
}

export class Text extends Base<TextConfig> {
  get bounds() {
    return new TextSize({ ...this.config });
  }

  duplicate() {
    return new Text({ ...this.config });
  }

  get component() {
    return TextComponent;
  }
}

export class Group extends BaseHasChildren<GroupConfig, Child> {
  get bounds() {
    return new GroupSize({ ...this.config }, [...this.children]);
  }

  duplicate() {
    return new Group({ ...this.config }).setChildren(
      this.children.map(child => child.duplicate())
    );
  }

  get component() {
    return GroupComponent;
  }
}

export class Layer extends BaseHasChildren<LayerConfig, Child> {
  get bounds() {
    return new DefaultSize({ ...this.config });
  }

  duplicate() {
    return new Layer({ ...this.config }).setChildren(
      this.children.map(child => child.duplicate())
    );
  }

  get component() {
    return LayerComponent;
  }
}

export class Stage extends BaseHasChildren<ContainerConfig, Child> {
  get bounds() {
    return new DefaultSize({ ...this.config });
  }

  duplicate() {
    return new Stage({ ...this.config }).setChildren(
      this.children.map(child => child.duplicate())
    );
  }

  get component() {
    return StageComponent;
  }
}
