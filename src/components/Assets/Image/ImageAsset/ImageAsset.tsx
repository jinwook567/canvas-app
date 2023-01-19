import React, { useRef } from 'react';
import { IconButton } from '@mui/material';
import { KonvaImageConfig } from '../../../../types/editor';
import * as Style from './ImageAsset.styles';

type Props = {
  url: KonvaImageConfig['url'];
  onClick: ({
    url,
    width,
    height,
  }: Pick<KonvaImageConfig, 'url' | 'width' | 'height'>) => void;
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
      <Style.Image src={url} alt="user-images" ref={refImage} />
    </IconButton>
  );
}

export default ImageAsset;
