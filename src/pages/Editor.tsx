import { Grid } from '@mui/material';
import React from 'react';
import ImageAssets from '../components/ImageAssets/ImageAssets';
import Stages from '../components/Stages/Stages';
import StagesContainer from '../components/StagesContainer/StagesContainer';

function Editor() {
  return (
    <Grid container>
      <Grid item lg={2}>
        <ImageAssets />
      </Grid>

      <Grid item lg={10}>
        <StagesContainer>
          <Stages />
        </StagesContainer>
      </Grid>
    </Grid>
  );
}

export default Editor;
