import React from 'react';
import { Grid } from '@mui/material';
import ImageAssets from '../components/Assets/Image/ImageAssetList/ImageAssetList';
import Stages from '../components/Canvas/StageList/StageList';

function Editor() {
  return (
    <Grid container>
      <Grid item lg={2}>
        <ImageAssets />
      </Grid>

      <Grid item lg={10}>
        <Stages />
      </Grid>
    </Grid>
  );
}

export default Editor;
