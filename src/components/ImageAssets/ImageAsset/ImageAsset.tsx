import { IconButton } from '@mui/material';
import React, { useRef } from 'react';
import { KonvaImageNode } from '../../../types/editor';

type Props = {
  url: KonvaImageNode['url'];
  onClick: ({
    url,
    width,
    height,
  }: Pick<KonvaImageNode, 'url' | 'width' | 'height'>) => void;
};

function ImageAsset({ url, onClick }: Props) {
  const refImage = useRef<HTMLImageElement>(null);

  const handleClick = () => {
    if (refImage.current) {
      onClick({
        url,
        width: refImage.current.offsetWidth,
        height: refImage.current.offsetHeight,
      });
    }
  };

  return (
    <IconButton key={url} onClick={handleClick}>
      <img src={url} alt="user-images" ref={refImage} />
    </IconButton>
  );
}

export default ImageAsset;