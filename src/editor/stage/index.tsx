import React, { ForwardedRef, forwardRef } from 'react';
import * as ReactKonva from 'react-konva';
import { HasChildren } from 'utils/type-utils';
import { setRef } from 'utils/ref';
import { StageNode } from 'editor/stage/service';
import { convertNode } from 'editor/node';

type Props = {
  width: number;
  height: number;
};

function Stage(
  { width, height, children }: HasChildren<Props>,
  ref: ForwardedRef<StageNode>
) {
  return (
    <ReactKonva.Stage
      width={width}
      height={height}
      ref={node => node && setRef(ref, convertNode(node))}
    >
      {children}
    </ReactKonva.Stage>
  );
}

export default forwardRef<StageNode, HasChildren<Props>>(Stage);
