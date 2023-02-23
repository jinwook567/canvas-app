import React, { ForwardedRef } from 'react';
import { Stage as KonvaStage } from 'react-konva';
import Konva from 'konva';

type Props = {
  children: React.ReactNode;
  width: NonNullable<Konva.StageConfig['width']>;
  height: NonNullable<Konva.StageConfig['height']>;
} & Konva.StageConfig;

function Stage({ children, ...config }: Props, ref: ForwardedRef<Konva.Stage>) {
  return (
    <KonvaStage ref={ref} {...config}>
      {children}
    </KonvaStage>
  );
}

export default React.forwardRef(Stage);
