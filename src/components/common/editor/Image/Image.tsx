import React, { ForwardedRef } from 'react';
import useImage from 'use-image';
import Konva from 'konva';
import { Image as KonvaImage } from 'react-konva';

type Props = Konva.ImageConfig | (Konva.ImageConfig & { src: string });

function Image(
  { src, image, ...config }: Props,
  ref: ForwardedRef<Konva.Image>
) {
  return (
    <KonvaImage
      {...config}
      image={src ? useImage(src, 'anonymous')[0] : image}
      ref={ref}
    />
  );
}

export default React.forwardRef(Image);
