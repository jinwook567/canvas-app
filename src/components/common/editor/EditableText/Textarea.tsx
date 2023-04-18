import React from 'react';
import { Html } from 'react-konva-utils';
import Konva from 'konva';

type Props = {
  onChange: (text: string) => void;
  node: Konva.Text;
};

function Textarea({ onChange, node }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <Html
      divProps={{
        style: {
          top: `${(node.y() || 0) - 5}px`,
          left: `${(node.x() || 0) - 5}px`,
        },
      }}
    >
      <textarea
        onChange={handleChange}
        value={node.text()}
        rows={node.text().split('/\n').length}
        style={{
          width: `${node.width() + 50}px`,
          height: `${node.height() + 10}px`,
          border: 'none',
          outline: 'none',
          resize: 'none',
          overflow: 'hidden',
          color: 'transparent',
          caretColor: 'black',
          background: 'transparent',
          zIndex: -1,
          fontSize: `${node.height()}px`,
          lineHeight: `${node.lineHeight()}px`,
          letterSpacing: `${node.letterSpacing()}px`,
          fontFamily: node.fontFamily() || 'inherit',
          fontVariant: node.fontVariant(),
          fontStyle: node.fontStyle(),
          fontWeight: node.fontVariant(),
          margin: '0px',
          transform: `rotate(${node.rotation()}deg)`,
          transformOrigin: 'top left',
          textAlign: node.align() as
            | 'start'
            | 'end'
            | 'left'
            | 'right'
            | 'center'
            | 'justify'
            | 'match-parent',
          verticalAlign: node.verticalAlign(),
        }}
      />
    </Html>
  );
}

export default Textarea;
