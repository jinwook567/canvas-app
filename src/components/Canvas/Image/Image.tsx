/* eslint-disable react/jsx-props-no-spreading */
import Konva from 'konva';
import React, { ForwardedRef } from 'react';
import { Image as ReactKonvaImage } from 'react-konva';
import useImage from 'use-image';
import { KonvaImageNode } from '../../../types/editor';

type Props = KonvaImageNode;

function Image({ type, url, ...rest }: Props, ref: ForwardedRef<Konva.Image>) {
  const [image] = useImage(url);

  return <ReactKonvaImage image={image} {...rest} ref={ref} />;
}

export default React.forwardRef(Image);
