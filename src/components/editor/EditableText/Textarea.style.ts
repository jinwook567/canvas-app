import { TextConfig } from 'konva/lib/shapes/Text';
import { ShapeBounds } from '../../../types/editor';

export const textareaStyle = (
  bounds: ShapeBounds,
  config: TextConfig
): React.CSSProperties => ({
  border: 'none',
  outline: 'none',
  resize: 'none',
  overflow: 'hidden',
  color: 'transparent',
  caretColor: 'black',
  background: 'transparent',
  zIndex: -1,
  margin: '0px',
  transformOrigin: 'top left',
  width: `${bounds.actualWidth}px`,
  height: `${bounds.actualHeight}px`,
  fontSize: `${(config.fontSize || 1) * bounds.scaleY}px`,
  lineHeight: `${
    (config.lineHeight || 1) * (config.fontSize || 1) * bounds.scaleY
  }px`,
  letterSpacing: `${config.letterSpacing || 0}px`,
  fontFamily: config.fontFamily || 'Arial',
  fontVariant: config.fontVariant || 'normal',
  fontStyle: config.fontStyle || 'normal',
  fontWeight: config.fontVariant || 'normal',
  transform: `rotate(${config.rotation || 0}deg)`,
  textAlign: (config.align || 'left') as
    | 'start'
    | 'end'
    | 'left'
    | 'right'
    | 'center'
    | 'justify'
    | 'match-parent',
  verticalAlign: config.verticalAlign || 'top',
});
