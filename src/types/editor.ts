import Konva from 'konva';
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
