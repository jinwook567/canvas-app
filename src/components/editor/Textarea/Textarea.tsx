import React from 'react';
import { style } from './Textarea.style';

type Props = {
  onChange: (text: string) => void;
  text: string;
  style: React.CSSProperties;
};

function Textarea({ onChange, text, style }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <textarea
      onChange={handleChange}
      value={text}
      rows={text.split('\n').length}
      style={style}
    />
  );
}

Textarea.style = style;

export default Textarea;
