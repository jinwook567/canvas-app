import React, { ForwardedRef } from 'react';
import { ShapeEvents, convertEvent } from 'editor/shape';
import { SquareConfig, SquareElement } from 'editor/square/service';
import * as ReactKonva from 'react-konva';
import { setRef } from 'utils/ref';
import { convertNode } from 'editor/node';

type Props = SquareConfig & ShapeEvents;

function Square(
  { cornerRadius, ...args }: Props,
  ref: ForwardedRef<SquareElement>
) {
  return (
    <ReactKonva.Rect
      cornerRadius={cornerRadius}
      {...convertEvent(args)}
      ref={node => node && setRef(ref, convertNode(node))}
    />
  );
}

export default React.forwardRef<SquareElement, Props>(Square);
