import React from 'react';
import { Html } from 'react-konva-utils';
import Konva from 'konva';

type Props = {
  config: Konva.TextConfig;
  onChange: (text: string) => void;
  width: number;
  height: number;
};

function DomPortal({ config, onChange, width, height }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <Html
      divProps={{
        style: {
          top: `${(config.y || 0) - 5}px`,
          left: `${(config.x || 0) - 5}px`,
        },
      }}
    >
      <textarea
        onChange={handleChange}
        value={config.text}
        rows={(config.text || '').split('\n').length}
        style={{
          width: `${width + 50}px`,
          height: `${height + 10}px`,
          border: 'none',
          outline: 'none',
          resize: 'none',
          overflow: 'hidden',
          color: 'transparent',
          caretColor: 'black',
          background: 'transparent',
          zIndex: -1,
          fontSize: `${(config.fontSize || 0) * (config.scaleY || 1)}px`,
          lineHeight: `${config.lineHeight || config.fontSize}px`,
          letterSpacing: `${config.letterSpacing || 1}px`,
          fontFamily: config.fontFamily || 'inherit',
          fontVariant: config.fontVariant,
          fontStyle: config.fontStyle,
          fontWeight: config.fontVariant,
          margin: '0px',
          transform: `rotate(${config.rotation}deg)`,
          transformOrigin: 'top left',
          textAlign: config.align as
            | 'start'
            | 'end'
            | 'left'
            | 'right'
            | 'center'
            | 'justify'
            | 'match-parent',
          verticalAlign: config.verticalAlign,
        }}
      />
    </Html>
  );
}

export default DomPortal;
