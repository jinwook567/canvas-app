import Konva from 'konva';

export interface KonvaImageNode extends Omit<Konva.ImageConfig, 'image'> {
  type: 'image';
  width: number;
  height: number;
  x: number;
  y: number;
  id: string;
  url: string;
}

export type KonvaNode = KonvaImageNode;

export type KonvaStage = KonvaNode[];

export type KonvaStages = KonvaStage[];

export type ImageNodeArg = Omit<KonvaImageNode, 'id' | 'x' | 'y'>;

export type NodeArg = ImageNodeArg;

export type StageIndex = number;

export type StageSize = {
  width: number;
  height: number;
};

export type SelectedIds = KonvaNode['id'][];

export default {};
