import React from 'react';
import * as Konva from 'react-konva';
import useImage from 'use-image';
import { KonvaImageNode } from '../../../types/editor';

type Props = KonvaImageNode;

function Image({ type, url, ...rest }: Props) {
  const [image] = useImage(url);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Konva.Image image={image} {...rest} />;
}

export default Image;
