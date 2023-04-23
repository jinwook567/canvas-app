import React from 'react';
import Masonry from '@mui/lab/Masonry';
import Image from '../Image/Image';

type Props = {
  items: { src: string }[];
  onClick: (image: HTMLImageElement) => void;
};

function ImageList({ items, onClick }: Props) {
  return (
    <Masonry columns={2}>
      {items.map(({ src }, index) => (
        <Image
          src={src}
          onClick={image => image && onClick(image)}
          key={index}
        />
      ))}
    </Masonry>
  );
}

export default ImageList;
