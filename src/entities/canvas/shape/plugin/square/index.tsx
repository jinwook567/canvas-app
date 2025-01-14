import React, { ForwardedRef } from 'react';
import {
  ShapeEvents,
  adaptShapeEvents,
} from 'entities/canvas/shape/core/model';
import {
  SquareConfig,
  SquareElement,
} from 'entities/canvas/shape/plugin/square/model';
import * as ReactKonva from 'react-konva';
import { setRef } from 'shared/lib';
import { toNodeElement } from 'entities/node/model';

type Props = SquareConfig & ShapeEvents;

function Square(
  { cornerRadius, ...args }: Props,
  ref: ForwardedRef<SquareElement>
) {
  return (
    <ReactKonva.Rect
      cornerRadius={cornerRadius}
      {...adaptShapeEvents(args)}
      ref={node => node && setRef(ref, toNodeElement(node))}
    />
  );
}

export default React.forwardRef<SquareElement, Props>(Square);
