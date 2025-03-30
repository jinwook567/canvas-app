import React from 'react';
import { Grid } from '@mui/material';
import useImage from 'use-image';

type Props = {
  src: string;
  onClick: (image: HTMLImageElement) => void;
};

function Image({ src, onClick }: Props) {
  const [image] = useImage(src, 'anonymous');

  return (
    <Grid onClick={() => image && onClick(image)}>
      <img src={src} alt="asset" style={{ width: '100%' }} />
    </Grid>
  );
}

export default Image;
