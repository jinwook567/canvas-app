/* eslint-disable react/destructuring-assignment */
import React, { ForwardedRef, useState, useEffect } from 'react';
import Konva from 'konva';
import { Text as KonvaText } from 'react-konva';
import DomPortal from './DomPortal';

type Props = Konva.TextConfig & {
  onChange: (text: string) => void;
  isSelected: boolean;
};

function Text(
  { onChange, isSelected, ...config }: Props,
  ref: ForwardedRef<Konva.Text>
) {
  const [isChangeMode, setIsChangeMode] = useState(false);

  const handleDbClick = () => {
    setIsChangeMode(true);
  };

  useEffect(() => {
    if (!isSelected) {
      setIsChangeMode(false);
    }
  }, [isSelected]);

  const width =
    ref && typeof ref !== 'function' && ref.current
      ? ref.current.textWidth * (config.scaleX || 1)
      : 0;
  const height =
    ref && typeof ref !== 'function' && ref.current
      ? ref.current.textHeight *
        (config.scaleY || 1) *
        (config.text || '').split('\n').length
      : 0;

  return (
    <>
      {isChangeMode && (
        <DomPortal
          config={config}
          onChange={onChange}
          width={width}
          height={height}
        />
      )}
      <KonvaText {...config} onDblClick={handleDbClick} ref={ref} visible />
    </>
  );
}

export default React.forwardRef(Text);
