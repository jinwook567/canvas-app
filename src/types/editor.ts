import Konva from 'konva';

export interface KonvaImageNode extends Omit<Konva.ImageConfig, 'image'> {
  type: 'image';
  id: string;
  width: number;
  height: number;
  x: number;
  y: number;
  url: string;
  scaleX: number;
  scaleY: number;
}

export interface KonvaTextNode extends Konva.TextConfig {
  type: 'text';
  id: string;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
}

export interface KonvaGroupNode extends Konva.GroupConfig {
  type: 'group';
  id: string;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  children: KonvaNode[];
}

export type KonvaNode = KonvaImageNode | KonvaTextNode | KonvaGroupNode;

export type KonvaStage = KonvaNode[];

export type KonvaStages = KonvaStage[];

export type ImageNodeArg = Pick<
  KonvaImageNode,
  'type' | 'width' | 'height' | 'url'
>;

export type GroupNodeArg = Pick<KonvaGroupNode, 'children'>;

export type NodeArg = ImageNodeArg;

export type StageIndex = number;

export type StageSize = {
  width: number;
  height: number;
};

export type SelectedIds = KonvaNode['id'][];

export type KonvaRef = Konva.Image | Konva.Text | null;

export type IsPressedKey = {
  Shift: boolean;
};

export type TransformedNodes =
  | Pick<KonvaNode, 'id' | 'width' | 'height' | 'x' | 'y' | 'rotation'>
  | Pick<KonvaNode, 'id' | 'x' | 'y'>;
