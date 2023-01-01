import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import useEditor from '../../hooks/useEditor';
import AppendForm from './AppendForm/AppendForm';
import ImageAsset from './ImageAsset/ImageAsset';
import { KonvaImageNode } from '../../types/editor';

function ImageAssets() {
  const [images, setImages] = useState<{ url: string }[]>([]);

  const handleSubmit = (imageUrl: string) => {
    const existImage = images.find(({ url }) => url === imageUrl);
    if (existImage) {
      setImages([existImage, ...images.filter(({ url }) => url !== imageUrl)]);
    } else {
      setImages([...images, { url: imageUrl }]);
    }
  };

  // onDragEvent

  const { handleAppendAssest } = useEditor();

  const handleClick = ({
    url,
    width,
    height,
  }: Pick<KonvaImageNode, 'url' | 'width' | 'height'>) => {
    handleAppendAssest({ type: 'image', url, width, height });
  };

  return (
    <div>
      <AppendForm handleSubmit={handleSubmit} />
      {images.map(({ url }) => (
        <ImageAsset key={url} url={url} onClick={handleClick} />
      ))}
    </div>
  );
}

export default ImageAssets;
