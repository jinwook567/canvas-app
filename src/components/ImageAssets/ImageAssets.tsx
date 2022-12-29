import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import useEditor from '../../hooks/useEditor';
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

  // onDragEvent

  const { handleAppendAssest } = useEditor();

  const handleClick = (url: string) => {
    handleAppendAssest({ type: 'image', url });
  };

  return (
    <div>
      <AppendForm handleSubmit={handleSubmit} />
      {images.map(({ url }) => (
        <IconButton key={url} onClick={() => handleClick(url)}>
          <img src={url} alt="user-images" />
        </IconButton>
      ))}
    </div>
  );
}

export default ImageAssets;
