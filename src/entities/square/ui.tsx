import React, { ForwardedRef } from 'react';
import { SquareConfig, SquareElement } from 'entities/square/model';
import * as ReactKonva from 'react-konva';
import { setRef } from 'shared/lib';
import { toNodeElement, ShapeEvents, adaptShapeEvents } from 'shared/canvas';

type Props = SquareConfig & ShapeEvents;

function Square(
  { cornerRadius, fill, ...args }: Props,
  ref: ForwardedRef<SquareElement>
) {
  return (
    <ReactKonva.Rect
      cornerRadius={cornerRadius}
      {...adaptShapeEvents(args)}
      ref={node => node && setRef(ref, toNodeElement(node))}
      fill={fill}
      draggable
    />
  );
}

export default React.forwardRef<SquareElement, Props>(Square);
