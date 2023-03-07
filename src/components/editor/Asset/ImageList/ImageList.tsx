/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Masonry from '@mui/lab/Masonry';
import { IconButton } from '@mui/material';
import React from 'react';

type Props = {
  items: { src: string }[];
  onClick: (image: HTMLImageElement) => void;
};

function ImageList({ items, onClick }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    onClick(e.currentTarget);
  };

  return (
    <Masonry columns={2}>
      {items.map(({ src }, index) => (
        <IconButton key={index}>
          <img
            src={src}
            alt="asset"
            onClick={handleClick}
            style={{ width: '100%' }}
          />
        </IconButton>
      ))}
    </Masonry>
  );
}

export default ImageList;
