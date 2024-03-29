/* eslint-disable max-classes-per-file */
import { GroupConfig } from 'konva/lib/Group';
import { NodeConfig } from 'konva/lib/Node';
import { TextConfig } from 'konva/lib/shapes/Text';

export interface Size {
  width: number;
  height: number;
}

export interface ShapeBounds {
  x: number;
  y: number;
  endX: number;
  endY: number;
  width: number;
  height: number;
  actualWidth: number;
  actualHeight: number;
  scaleX: number;
  scaleY: number;
  size: Size;
}

export class DefaultSize<Config extends NodeConfig> implements ShapeBounds {
  protected _config: Config;

  constructor(config: Config) {
    this._config = config;
  }

  get x() {
    return this._config.x || 0;
  }

  get y() {
    return this._config.y || 0;
  }

  get scaleX() {
    return this._config.scaleX || 1;
  }

  get scaleY() {
    return this._config.scaleY || 1;
  }

  get width() {
    return this._config.width || 0;
  }

  get height() {
    return this._config.height || 0;
  }

  get actualWidth() {
    return this.width * this.scaleX;
  }

  get actualHeight() {
    return this.height * this.scaleY;
  }

  get endX() {
    return this.x + this.actualWidth;
  }

  get endY() {
    return this.y + this.actualHeight;
  }

  get size() {
    return { width: this.actualWidth, height: this.actualHeight };
  }

  get originSize() {
    return { width: this.width, height: this.height };
  }
}

export class TextSize<Config extends TextConfig> extends DefaultSize<Config> {
  get fontSize() {
    return this._config.fontSize || 0;
  }

  get text() {
    return this._config.text || '';
  }

  get width() {
    return (
      this.fontSize *
      this.text
        .split('\n')
        .reduce((acc, sentence) => Math.max(acc, sentence.length), 0)
    );
  }

  get height() {
    return this.fontSize * this.text.split('\n').length;
  }
}

export class GroupSize<
  Config extends GroupConfig,
  ChildType extends { bounds: ShapeBounds }
> extends DefaultSize<Config> {
  private children: ChildType[];

  constructor(config: Config, children: ChildType[]) {
    super(config);
    this.children = children;
  }

  get x() {
    return (
      this.children.reduce((acc, cur) => Math.min(acc, cur.bounds.x), 0) +
      super.x
    );
  }

  get y() {
    return (
      this.children.reduce((acc, cur) => Math.min(acc, cur.bounds.y), 0) +
      super.y
    );
  }

  get endX() {
    return (
      this.children.reduce((acc, cur) => Math.max(acc, cur.bounds.endX), 0) +
      super.x
    );
  }

  get endY() {
    return (
      this.children.reduce((acc, cur) => Math.max(acc, cur.bounds.endY), 0) +
      super.y
    );
  }

  get width() {
    return super.width || this.endX - this.x;
  }

  get height() {
    return super.height || this.endY - this.y;
  }
}
