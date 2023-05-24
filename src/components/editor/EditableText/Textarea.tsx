import React from 'react';
import { Html } from 'react-konva-utils';

type Props = {
  onChange: (text: string) => void;
  text: string;
  x: number;
  y: number;
  style: React.CSSProperties;
  rows: number;
};

function Textarea({ onChange, text, x, y, style, rows }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <Html
      divProps={{
        style: {
          top: `${y}px`,
          left: `${x}px`,
        },
      }}
    >
      <textarea
        onChange={handleChange}
        value={text}
        rows={rows}
        style={style}
      />
    </Html>
  );
}

export default Textarea;
