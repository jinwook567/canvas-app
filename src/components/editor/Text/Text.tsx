import React, { ReactElement, useState } from 'react';
import Konva from 'konva';
import EditableText from '../../common/editor/EditableText/EditableText';

type Props = {
  isSelected: boolean;
  node: Konva.Text | null;
  render: ReactElement;
};

function Text({ node, render, isSelected }: Props) {
  const [editable, setEditable] = useState(false);

  const handleChange = (text: string) => {
    console.log(text);
  };

  return (
    <EditableText
      editable={editable && isSelected}
      onChange={handleChange}
      onEdit={() => setEditable(true)}
      render={render}
      node={node}
    />
  );
}

export default Text;