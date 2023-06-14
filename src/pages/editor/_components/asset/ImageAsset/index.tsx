import React from 'react';
import { Grid } from '@mui/material';
import ImageUpload from 'components/editor/ImageUpload';
import { Image as ImageType, nodeFactory } from 'utils/editor/node';
import Asset from 'components/editor/Asset';
import Image from 'components/editor/Image';

interface Props {
  items: { src: string }[];
  addItem: (src: string) => void;
  addAsset: (shape: ImageType) => void;
}

function ImageAsset({ items, addItem, addAsset }: Props) {
  return (
    <Grid container flexDirection="column" alignItems="center" rowGap={3}>
      <ImageUpload onComplete={addItem} />
      <Asset>
        <Asset.Mansory>
          {items.map((item, index) => (
            <Image
              key={index}
              src={item.src}
              onClick={image =>
                addAsset(
                  nodeFactory('image').map(() => ({
                    image,
                    width: image.width,
                    height: image.height,
                  }))
                )
              }
            />
          ))}
        </Asset.Mansory>
      </Asset>
    </Grid>
  );
}

export default ImageAsset;
