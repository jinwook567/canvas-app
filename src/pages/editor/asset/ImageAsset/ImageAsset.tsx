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
      <ImageUpload onComplete={addItem} />
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
        columns={2}
      />
    </Grid>
  );
}

export default ImageAsset;
