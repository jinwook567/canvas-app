import React, { ForwardedRef, forwardRef } from 'react';
import * as ReactKonva from 'react-konva';
import { setRef, HasChildren } from 'shared/lib';
import { StageElement } from 'entities/canvas/stage/model';
import { toNodeElement } from 'entities/canvas/node/model';

type Props = {
  width: number;
  height: number;
};

function Stage(
  { width, height, children }: HasChildren<Props>,
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

export default forwardRef<StageElement, HasChildren<Props>>(Stage);
