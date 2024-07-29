import React, { ForwardedRef, forwardRef } from 'react';
import { ImageConfig, ImageElement } from 'editor/image/service';
import * as ReactKonva from 'react-konva';
import { setRef } from 'utils/ref';
import { convertEvent, convertShape, ShapeEvents } from 'editor/shape';

type Props = ImageConfig & ShapeEvents;

function Image({ source, ...args }: Props, ref: ForwardedRef<ImageElement>) {
  return (
    <ReactKonva.Image
      image={source}
      {...convertEvent(args)}
      ref={node => node && setRef(ref, convertShape(node))}
    />
  );
}

export default forwardRef<ImageElement, Props>(Image);
