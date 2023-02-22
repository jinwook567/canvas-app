import React, { ForwardedRef, useState } from 'react';
import Konva from 'konva';
import { Text as KonvaText } from 'react-konva';
import DomPortal from './DomPortal';

type Props = Konva.TextConfig & { onChange: (text: string) => void };

function Text({ onChange, ...config }: Props, ref: ForwardedRef<Konva.Text>) {
  const [isChangeMode, setIsChangeMode] = useState(false);

  const handleDbClick = () => {
    setIsChangeMode(false);
  };

  return isChangeMode ? (
    <DomPortal
      x={config.x}
      y={config.y}
      text={config.text}
      onChange={onChange}
    />
  ) : (
    <KonvaText {...config} onDblClick={handleDbClick} ref={ref} />
  );
}

export default React.forwardRef(Text);
