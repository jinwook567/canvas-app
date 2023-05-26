import React from 'react';
import { Stage, StageProps } from 'react-konva';
import { getResizeScale } from '../../../utils/editor/scale';

type Size = {
  width: number;
  height: number;
};

type Props = StageProps & {
  size: Size;
  parentSize: Size;
  parentRatio: number;
  children: React.ReactNode;
};

function ResponsiveStage({
  size,
  parentSize,
  parentRatio,
  children,
  ...props
}: Props) {
  const scale = getResizeScale(size, parentSize, parentRatio);

  return (
    <Stage
      width={size.width * scale}
      height={size.height * scale}
      scaleX={scale}
      scaleY={scale}
      {...props}
    >
      {children}
    </Stage>
  );
}

export default ResponsiveStage;
