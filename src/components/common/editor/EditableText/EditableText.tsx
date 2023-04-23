import React, { ReactElement } from 'react';
import { Group } from 'react-konva';
import Konva from 'konva';
import Textarea from './Textarea';

type Props = {
  onChange: (text: string) => void;
  onEdit: () => void;
  editable: boolean;
  render: ReactElement;
  node: Konva.Text | null;
};

function EditableText({ render, onChange, editable, onEdit, node }: Props) {
  return (
    <>
      {editable && node && <Textarea onChange={onChange} node={node} />}
      <Group onDblClick={() => onEdit()}>{render}</Group>
    </>
  );
}

export default EditableText;
