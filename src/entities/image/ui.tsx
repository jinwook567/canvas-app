import React, { ForwardedRef, forwardRef } from 'react';
import { ImageConfig, ImageElement } from './model';
import * as ReactKonva from 'react-konva';
import { setRef } from 'shared/lib';
import {
  adaptShapeEvents,
  toShapeElement,
  ShapeEvents,
  adaptConfig,
} from 'shared/canvas';

type Props = ImageConfig & ShapeEvents;

function Image({ source, ...args }: Props, ref: ForwardedRef<ImageElement>) {
  return (
    <ReactKonva.Image
      image={source}
      {...adaptConfig(args)}
      {...adaptShapeEvents(args)}
      ref={node => node && setRef(ref, toShapeElement(node))}
    />
  );
}

export default forwardRef<ImageElement, Props>(Image);
