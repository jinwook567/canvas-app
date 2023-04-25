import Konva from 'konva';
import { NodeConfig } from 'konva/lib/Node';
import { KonvaNodeComponent } from 'react-konva';

export type Size = {
  width: number;
  height: number;
};

export interface RefConfig<Ref extends Konva.Node, Config extends NodeConfig> {
  node: Ref | null;
  config: Config;
  setConfig: (config: Config) => this;
  clone: () => this;
  id: string;
}

export interface Shape<
  Ref extends Konva.Node = Konva.Node,
  Config extends NodeConfig = NodeConfig
> extends RefConfig<Ref, Config> {
  component: KonvaNodeComponent<Ref, any>;
  duplicate: () => Shape<Ref, Config>;
  bounds: ShapeBounds;
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
