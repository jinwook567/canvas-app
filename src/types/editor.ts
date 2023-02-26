import Konva from 'konva';
import { RemoveIndex } from '../utils/types';

type Image = {
  id: string;
  type: 'image';
  config: Konva.ImageConfig;
  src: string;
};

type Text = {
  id: string;
  type: 'text';
  config: Konva.TextConfig;
};

type Group = {
  id: string;
  type: 'group';
  config: Konva.GroupConfig;
  nodes: Node[];
};

export type Node = Image | Text | Group;

export type Stage = {
  id: string;
  config: Konva.ContainerConfig;
  nodes: Node[];
};

type RequiredNodeConfig = Required<
  Pick<Konva.NodeConfig, 'id' | 'x' | 'y' | 'scaleX' | 'scaleY'>
>;

type RequiredImageConfig = Required<
  Pick<Konva.ImageConfig, 'width' | 'height'>
>;

export type KonvaImageConfig = RequiredNodeConfig &
  RequiredImageConfig &
  Omit<RemoveIndex<Konva.ImageConfig>, 'image'> & {
    type: 'image';
    url: string;
  };

type RequiredTextConfig = Required<
  Pick<
    Konva.TextConfig,
    'text' | 'fontSize' | 'fontFamily' | 'align' | 'verticalAlign'
  >
>;

export type KonvaTextConfig = RequiredNodeConfig &
  RequiredTextConfig &
  RemoveIndex<Konva.TextConfig> & { type: 'text' };

export type KonvaGroupConfig = RequiredNodeConfig &
  RemoveIndex<Konva.GroupConfig> & {
    type: 'group';
    children: KonvaNodeConfig[];
  };

export type KonvaNodeConfig =
  | KonvaImageConfig
  | KonvaTextConfig
  | KonvaGroupConfig;

export type KonvaStage = KonvaNodeConfig[];

export type KonvaStageList = KonvaStage[];

export type DefaultKonvaImageConfig = Pick<
  KonvaImageConfig,
  'scaleX' | 'scaleY'
>;

export type DefaultKonvaTextConfig = Pick<
  KonvaTextConfig,
  'scaleX' | 'scaleY' | 'align' | 'verticalAlign'
>;

export type DefaultKonvaGroupConfig = Pick<
  KonvaGroupConfig,
  'scaleX' | 'scaleY' | 'x' | 'y'
>;

export type KonvaImageConfigArg = Omit<
  KonvaImageConfig,
  keyof DefaultKonvaImageConfig | 'x' | 'y' | 'id'
>;

export type KonvaTextConfigArg = Omit<
  KonvaTextConfig,
  keyof DefaultKonvaTextConfig | 'x' | 'y' | 'id'
>;

export type KonvaGroupConfigArg = Omit<
  KonvaGroupConfig,
  keyof DefaultKonvaGroupConfig | 'id' | 'type'
>;

export type NodeArg = KonvaImageConfigArg | KonvaTextConfigArg;

export type StageIndex = number;

export type StageSize = {
  width: number;
  height: number;
};

export type SelectedIds = KonvaNodeConfig['id'][];

export type IsPressedKey = {
  Shift: boolean;
};

export type TransformedNodes =
  | Pick<KonvaNodeConfig, 'id' | 'width' | 'height' | 'x' | 'y' | 'rotation'>[]
  | Pick<KonvaNodeConfig, 'id' | 'x' | 'y'>[];

export type Template = {
  width: number;
  height: number;
  nodes: KonvaStage;
};
