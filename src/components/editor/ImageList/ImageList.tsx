import React from 'react';
import Masonry from '@mui/lab/Masonry';
import Image from '../Image/Image';

type Props = {
  items: { src: string }[];
  onClick: (image: HTMLImageElement) => void;
  columns: number;
};

function ImageList({ items, onClick, columns }: Props) {
  return (
    <Masonry columns={columns}>
      {items.map(({ src }, index) => (
        <Image src={src} onClick={onClick} key={index} />
      ))}
    </Masonry>
  );
}

export default ImageList;
