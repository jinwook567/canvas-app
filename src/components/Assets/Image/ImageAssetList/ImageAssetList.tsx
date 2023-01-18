import React, { useState } from 'react';
import AppendForm from '../AppendForm/AppendForm';
import ImageAsset from '../ImageAsset/ImageAsset';
import { KonvaImageNode } from '../../../../types/editor';
import { imageAssets } from '../../../../fixtures/editor';
import useAsset from '../../../../hooks/useAsset';

function ImageAssets() {
  const [images, setImages] = useState<{ url: string }[]>(imageAssets);

  const handleSubmit = (imageUrl: string) => {
    const existImage = images.find(({ url }) => url === imageUrl);
    if (existImage) {
      setImages([existImage, ...images.filter(({ url }) => url !== imageUrl)]);
    } else {
      setImages([...images, { url: imageUrl }]);
    }
  };

  const { appendAsset } = useAsset();

  const handleAppendAsset = ({
    url,
    width,
    height,
  }: Pick<KonvaImageNode, 'url' | 'width' | 'height'>) => {
    appendAsset({ type: 'image', url, width, height });
  };

  return (
    <div>
      <AppendForm handleSubmit={handleSubmit} />
      {images.map(({ url }) => (
        <ImageAsset key={url} url={url} onClick={handleAppendAsset} />
      ))}
    </div>
  );
}

export default ImageAssets;
