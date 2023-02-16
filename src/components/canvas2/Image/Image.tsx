import React from 'react';
import useImage from 'use-image';
import Konva from 'konva';
import { Image as KonvaImage } from 'react-konva';

type Props = Konva.ImageConfig | (Konva.ImageConfig & { url: string });

function Image(props: Props) {
  const { url, image } = props;
  return (
    <KonvaImage
      {...props}
      image={url ? useImage(url, 'anonymous')[0] : image}
    />
  );
}

export default Image;
