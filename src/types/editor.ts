import { NodeConfig } from 'konva/lib/Node';
import { KonvaNodeComponent } from 'react-konva';

export type Size = {
  width: number;
  height: number;
};

export interface Shape<Config extends NodeConfig = NodeConfig> {
  readonly id: string;
  readonly bounds: ShapeBounds;

  component: KonvaNodeComponent<any, any>;
  config: Config;
  setConfig: (config: Config) => this;
  duplicate(): Shape<Config>;
  children?: Shape[];
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
