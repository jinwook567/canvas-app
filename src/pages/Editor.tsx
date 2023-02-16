import React from 'react';
import { Grid } from '@mui/material';
import StageList from '../components/Canvas/StageList/StageList';
import Assets from '../components/Assets/Assets/Assets';
import HeaderController from '../components/Controller/HeaderController/HeaderController';
import StageListWrapper from '../components/Canvas/StageListWrapper/StageListWrapper';
import Layout from '../components/common/Layout/Layout';

function Editor() {
  return (
    <Layout>
      <Layout.Header>
        <HeaderController />
      </Layout.Header>

      <Layout.Main>
        <Grid lg={3} item>
          <Assets />
        </Grid>

        <Grid lg={9} item>
          <StageListWrapper>
            <StageList />
          </StageListWrapper>
        </Grid>
      </Layout.Main>

      <Layout.Footer>
        <a href="https://github.com/jinwook567/canvas-app">canvas-app</a>
      </Layout.Footer>
    </Layout>
  );
}

export default Editor;
