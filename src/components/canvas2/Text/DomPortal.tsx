import React from 'react';
import { Html } from 'react-konva-utils';
import Konva from 'konva';

type Props = {
  x: Konva.TextConfig['x'];
  y: Konva.TextConfig['y'];
  text: Konva.TextConfig['text'];
  onChange: (text: string) => void;
};

function DomPortal({ x, y, text, onChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <Html divProps={{ x, y }}>
      <textarea onChange={handleChange} value={text} />
    </Html>
  );
}

export default DomPortal;
