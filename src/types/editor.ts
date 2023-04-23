import Konva from 'konva';
import { NodeConfig } from 'konva/lib/Node';
import { KonvaNodeEvents } from 'react-konva';

export type Size = {
  width: number;
  height: number;
};

export interface RefConfig<Ref extends Konva.Node, Config extends NodeConfig> {
  node: Ref | null;
  config: Config;
  setConfig: (config: Config) => this;
  id: string;
}

export interface Shape<
  Ref extends Konva.Node = Konva.Node,
  Config extends NodeConfig = NodeConfig
> extends RefConfig<Ref, Config> {
  render: (events?: KonvaNodeEvents) => React.ReactElement;
  duplicate: () => Shape<Ref, Config>;
  bounds: ShapeBounds;
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
