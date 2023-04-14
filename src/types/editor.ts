import Konva from 'konva';
import { RefObject } from 'react';
import { RemoveIndex } from '../utils/types';

export interface ImageConfigWithoutImage
  extends Omit<RemoveIndex<Konva.ImageConfig>, 'image'> {
  image?: Konva.ImageConfig['image'];
  [x: string]: unknown;
}

export type Image = {
  readonly id: string;
  readonly type: 'image';
  config: ImageConfigWithoutImage;
  src: string;
};

export type Text = {
  readonly id: string;
  readonly type: 'text';
  config: Konva.TextConfig;
};

export type Group = {
  readonly id: string;
  readonly type: 'group';
  config: Konva.GroupConfig;
  nodes: Node[];
};

export type Node = Image | Text | Group;

export type NodeWithoutId =
  | Omit<Image, 'id'>
  | Omit<Text, 'id'>
  | (Omit<Group, 'id'> & { nodes: NodeWithoutId[] });

export type Stage = {
  id: string;
  config: Konva.ContainerConfig;
  nodes: Node[];
};

export type Size = {
  width: number;
  height: number;
};

export interface RefConfig<Ref, Config> {
  current: RefObject<Ref>['current'];
  config: Config;
  id: string;
}

export interface Shape<Ref, Config> extends RefConfig<Ref, Config> {
  render: () => React.ReactElement;
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
}
