import React, { useState } from 'react';
import AppendForm from './AppendForm/AppendForm';

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

  // onClick, onDrag event

  return (
    <div>
      <AppendForm handleSubmit={handleSubmit} />
      {images.map(({ url }) => (
        <img key={url} src={url} alt="user-images" />
      ))}
    </div>
  );
}

export default ImageAssets;
