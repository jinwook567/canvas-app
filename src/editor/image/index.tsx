import React, { ForwardedRef, forwardRef } from 'react';
import { ImageConfig, ImageElement } from 'editor/image/service';
import * as ReactKonva from 'react-konva';
import { setRef } from 'utils/ref';
import { convertShape } from 'editor/shape';

function Image(
  { source, ...args }: ImageConfig,
  ref: ForwardedRef<ImageElement>
) {
  return (
    <ReactKonva.Image
      image={source}
      {...args}
      ref={node => node && setRef(ref, convertShape(node))}
    />
  );
}

export default forwardRef<ImageElement, ImageConfig>(Image);
