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
          top: `${node.y()}px`,
          left: `${node.x()}px`,
        },
      }}
    >
      <textarea
        onChange={handleChange}
        value={node.text()}
        rows={node.textArr.length}
        style={{
          width: `${node.textWidth * node.scaleX()}px`,
          height: `${node.textHeight * node.textArr.length * node.scaleY()}px`,
          border: 'none',
          outline: 'none',
          resize: 'none',
          overflow: 'hidden',
          color: 'transparent',
          caretColor: 'black',
          background: 'transparent',
          zIndex: -1,
          fontSize: `${node.fontSize() * node.scaleY()}px`,
          lineHeight: `${
            node.lineHeight() * node.fontSize() * node.scaleY()
          }px`,
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
