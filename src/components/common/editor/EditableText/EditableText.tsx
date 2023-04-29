import React, { ReactElement } from 'react';
import { TextConfig } from 'konva/lib/shapes/Text';
import { Group } from 'react-konva';
import Textarea from './Textarea';
import { ShapeBounds } from '../../../../types/editor';

type Props = {
  onChange: (text: string) => void;
  onEdit: () => void;
  editable: boolean;
  render: ReactElement;
  config: TextConfig;
  bounds: ShapeBounds;
};

function EditableText({
  onChange,
  editable,
  onEdit,
  render,
  config,
  bounds,
}: Props) {
  const style: React.CSSProperties = {
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
  };

  return (
    <>
      {editable && (
        <Textarea
          onChange={onChange}
          text={config.text || ''}
          x={bounds.x}
          y={bounds.y}
          rows={(config.text || '').split('\n').length}
          style={style}
        />
      )}
      <Group onDblClick={() => onEdit()}>{render}</Group>
    </>
  );
}

export default EditableText;
