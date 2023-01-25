import Konva from 'konva';
import { RemoveIndex } from '../utils/types';

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

export type KonvaRef = Konva.Image | Konva.Text | null;

export type IsPressedKey = {
  Shift: boolean;
};

export type TransformedNodes =
  | Pick<KonvaNodeConfig, 'id' | 'width' | 'height' | 'x' | 'y' | 'rotation'>[]
  | Pick<KonvaNodeConfig, 'id' | 'x' | 'y'>[];

export type Template = {
  stageWidth: number;
  stageHeight: number;
  nodes: KonvaStage;
};
