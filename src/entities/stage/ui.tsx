import React, { ForwardedRef, forwardRef } from 'react';
import * as ReactKonva from 'react-konva';
import { setRef, HasChildren } from 'shared/lib';
import { ShapeConfig, toNodeElement } from 'shared/canvas';
import { StageConfig, StageElement } from './model';

type Props<Child extends ShapeConfig> = StageConfig<Child>;

function Stage<Child extends ShapeConfig>(
  { width, height, children }: HasChildren<Props<Child>>,
  ref: ForwardedRef<StageElement>
) {
  return (
    <ReactKonva.Stage
      width={width}
      height={height}
      ref={node => node && setRef(ref, toNodeElement(node))}
    >
      {children}
    </ReactKonva.Stage>
  );
}

export default forwardRef(Stage);
