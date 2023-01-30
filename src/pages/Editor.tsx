import React from 'react';
import { Grid } from '@mui/material';
import StageList from '../components/Canvas/StageList/StageList';
import Container from '../components/Layout/Container/Container';
import Header from '../components/Layout/Header/Header';
import Footer from '../components/Layout/Footer/Footer';
import Main from '../components/Layout/Main/Main';
import Assets from '../components/Assets/Assets/Assets';
import HeaderController from '../components/Controller/HeaderController/HeaderController';
import StageListWrapper from '../components/Canvas/StageListWrapper/StageListWrapper';

function Editor() {
  return (
    <Container>
      <Header>
        <HeaderController />
      </Header>

      <Main>
        <Grid lg={3} item>
          <Assets />
        </Grid>

        <Grid lg={9} item>
          <StageListWrapper>
            <StageList />
          </StageListWrapper>
        </Grid>
      </Main>

      <Footer>
        <a href="https://github.com/jinwook567/canvas-app">canvas-app</a>
      </Footer>
    </Container>
  );
}

export default Editor;
