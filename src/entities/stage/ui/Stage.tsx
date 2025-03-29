import React, { ForwardedRef, forwardRef } from 'react';
import * as ReactKonva from 'react-konva';
import { setRef, HasChildren } from 'shared/lib';
import { toContainerElement } from 'shared/canvas';
import { StageConfig, StageElement } from '../model';

type Props<Child> = StageConfig<Child>;

function Stage<Child>(
  { width, height, fill, children }: HasChildren<Props<Child>>,
  ref: ForwardedRef<StageElement>
) {
  return (
    <ReactKonva.Stage
      width={width}
      height={height}
      ref={node => node && setRef(ref, toContainerElement(node))}
      style={{ background: fill ?? 'white' }}
    >
      {children}
    </ReactKonva.Stage>
  );
}

export default forwardRef(Stage);
