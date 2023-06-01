import React, { ReactElement } from 'react';
import { TextConfig } from 'konva/lib/shapes/Text';
import { Group } from 'react-konva';
import Textarea from './Textarea';
import { ShapeBounds } from '../../../utils/editor/size';
import { textareaStyle } from './Textarea.style';

type Props = {
  onChange: (text: string) => void;
  onDbClick: () => void;
  editable: boolean;
  render: ReactElement;
  config: TextConfig;
  bounds: ShapeBounds;
};

function EditableText({
  onChange,
  onDbClick,
  editable,
  render,
  config,
  bounds,
}: Props) {
  return (
    <>
      {editable && (
        <Textarea
          onChange={onChange}
          text={config.text || ''}
          x={bounds.x - 2}
          y={bounds.y - 3}
          style={textareaStyle(bounds, config)}
        />
      )}
      <Group onDblClick={() => onDbClick()}>{render}</Group>
    </>
  );
}

export default EditableText;
