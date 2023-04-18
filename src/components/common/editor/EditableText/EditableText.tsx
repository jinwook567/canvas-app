import React, { ReactElement } from 'react';
import Konva from 'konva';
import Textarea from './Textarea';

type Props = {
  onChange: (text: string) => void;
  editable: boolean;
  render: ReactElement;
  node: Konva.Text | null;
};

function EditableText({ render, onChange, editable, node }: Props) {
  return (
    <>
      {editable && node && <Textarea onChange={onChange} node={node} />}
      {render}
    </>
  );
}

export default EditableText;
