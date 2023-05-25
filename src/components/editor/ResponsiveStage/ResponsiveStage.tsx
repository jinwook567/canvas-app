import React from 'react';
import { Stage, StageProps } from 'react-konva';
import { getResizeScale } from '../../../utils/editor/scale';
import DivSize from '../DivSize/DivSize';

type Size = {
  width: number;
  height: number;
};

type Props = StageProps &
  Size & {
    parentRatio: number;
    handleParentSize?: (size: Size) => Size;
  };

function ResponsiveStage({
  width,
  height,
  parentRatio,
  children,
  handleParentSize,
  ...props
}: Props) {
  const calcScale = (targetSize: { width: number; height: number }) =>
    getResizeScale(
      {
        width,
        height,
      },
      targetSize,
      parentRatio
    );

  return (
    <DivSize style={{ width: '100%', height: '100%' }}>
      {divSize => {
        const scale = calcScale(
          handleParentSize ? handleParentSize(divSize) : divSize
        );
        return (
          <Stage
            width={width * scale}
            height={height * scale}
            scaleX={scale}
            scaleY={scale}
            {...props}
          >
            {children}
          </Stage>
        );
      }}
    </DivSize>
  );
}

export default ResponsiveStage;
