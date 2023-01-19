import {
  DefaultKonvaGroupConfig,
  DefaultKonvaImageConfig,
  DefaultKonvaTextConfig,
} from '../types/editor';

export const initialImageStageRatio = 0.3;

export const defaultTextConfig: DefaultKonvaTextConfig = {
  scaleX: 1,
  scaleY: 1,
  align: 'center' as const,
  verticalAlign: 'top' as const,
};

export const defaultImageConfig: DefaultKonvaImageConfig = {
  scaleX: 1,
  scaleY: 1,
};

export const defaultGroupConfig: DefaultKonvaGroupConfig = {
  scaleX: 1,
  scaleY: 1,
  x: 0,
  y: 0,
};

export default {};
