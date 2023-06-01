import { NodeConfig } from 'konva/lib/Node';
import { KonvaNodeComponent } from 'react-konva';
import { ShapeBounds } from '../utils/editor/size';

export interface Shape<Config extends NodeConfig = NodeConfig> {
  readonly id: string;
  readonly bounds: ShapeBounds;

  component: KonvaNodeComponent<any, any>;
  config: Config;
  setConfig: (config: Config) => this;
  duplicate(): Shape<Config>;
  children?: Shape[];
}
