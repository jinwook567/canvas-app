import React from 'react';
import { useRecoilValue } from 'recoil';
import { Grid } from '@mui/material';
import ImageList from 'components/editor/ImageList';
import ImageUpload from 'components/editor/ImageUpload';
import useAdd from 'hooks/editor/node/useAdd';
import { selectedStageState } from 'recoils/editor/atoms';
import { nodeFactory } from 'utils/editor/node';

interface Props {
  items: { src: string }[];
  addItem: (src: string) => void;
}

function ImageAsset({ items, addItem }: Props) {
  const selectedStage = useRecoilValue(selectedStageState);
  const { addNodeToStage } = useAdd();

  return (
    <Grid container flexDirection="column" alignItems="center" rowGap={3}>
      <ImageUpload onComplete={addItem} />
      <ImageList
        items={items}
        onClick={image =>
          selectedStage &&
          addNodeToStage(
            nodeFactory('image').map(() => ({
              image,
              width: image.width,
              height: image.height,
            })),
            selectedStage
          )
        }
        columns={2}
      />
    </Grid>
  );
}

export default ImageAsset;
