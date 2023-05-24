import React from 'react';
import { useRecoilValue } from 'recoil';
import { Grid } from '@mui/material';
import ImageList from '../../../../components/editor/ImageList/ImageList';
import ImageUpload from '../../../../components/editor/ImageUpload/ImageUpload';
import useAdd from '../../../../hooks/editor/node/useAdd';
import { Image } from '../../../../utils/editor/shapes';
import { selectedStageClassValue } from '../../../../recoil/editor/selectors';

interface Props {
  items: { src: string }[];
  addItem: (src: string) => void;
}

function ImageAsset({ items, addItem }: Props) {
  const stage = useRecoilValue(selectedStageClassValue);
  const { addShapeToStage } = useAdd();

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
          stage &&
          addShapeToStage(
            new Image({
              image,
              width: image.width,
              height: image.height,
            }),
            stage.id
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
