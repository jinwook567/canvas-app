import React from 'react';
import Konva from 'konva';
import { Stage, StageProps } from 'react-konva';
import { getResizeScale } from 'old/utils/editor/scale';

type Size = {
  width: number;
  height: number;
};

type Props = StageProps & {
  size: Size;
  parentSize: Size;
  parentRatio: number;
  children: React.ReactNode;
  setRef?: (ref: Konva.Stage | null) => void;
};

function ResponsiveStage({
  size,
  parentSize,
  parentRatio,
  children,
  setRef,
  ...props
}: Props) {
  const scale = getResizeScale(size, parentSize, parentRatio);

  return (
    <Stage
      {...props}
      width={size.width * scale}
      height={size.height * scale}
      scaleX={scale}
      scaleY={scale}
      ref={setRef}
    >
      {children}
    </Stage>
  );
}

export default ResponsiveStage;
