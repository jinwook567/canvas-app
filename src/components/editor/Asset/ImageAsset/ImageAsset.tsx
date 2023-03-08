import React from 'react';
import { Grid } from '@mui/material';
import useCreate from '../../../../hooks/editor/Node/useCreate';
import ImageList from '../../ImageList/ImageList';
import ImageUpload from '../../ImageUpload/ImageUpload';

interface Props {
  items: { src: string }[];
  addItem: (src: string) => void;
}

function ImageAsset({ items, addItem }: Props) {
  const { createNode } = useCreate();
  return (
    <Grid container flexDirection="column" alignItems="center" rowGap={3}>
      <ImageUpload
        onSubmit={files => {
          if (!files) return;
          for (let i = 0; i < files.length; i += 1) {
            readImageFileAsURL(files[i], src => addItem(src));
          }
        }}
      />
      <ImageList
        items={items}
        onClick={image =>
          createNode({
            type: 'image',
            src: image.src,
            config: {
              width: image.width,
              height: image.height,
              image: undefined,
            },
          })
        }
      />
    </Grid>
  );
}

function readImageFileAsURL(file: File, callback: (result: string) => void) {
  const reader = new FileReader();
  reader.onloadend = () => {
    if (reader.result) {
      if (reader.result instanceof ArrayBuffer) {
        callback(Buffer.from(reader.result).toString('base64'));
      } else {
        callback(reader.result);
      }
    }
  };
  reader.readAsDataURL(file);
}

export default ImageAsset;
