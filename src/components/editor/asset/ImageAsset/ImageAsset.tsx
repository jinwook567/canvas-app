import React from 'react';
import { useRecoilValue } from 'recoil';
import { Grid } from '@mui/material';
import useCreate from '../../../../hooks/editor/node/useCreate';
import ImageList from '../../../common/editor/ImageList/ImageList';
import ImageUpload from '../../../common/editor/ImageUpload/ImageUpload';
import { selectedStageValue } from '../../../../recoil/editor/selectors';

interface Props {
  items: { src: string }[];
  addItem: (src: string) => void;
}

function ImageAsset({ items, addItem }: Props) {
  const { createNode } = useCreate();
  const selectedStage = useRecoilValue(selectedStageValue);
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
          selectedStage &&
          createNode(
            {
              type: 'image',
              src: image.src,
              config: {
                width: image.width,
                height: image.height,
              },
            },
            selectedStage
          )
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
