import React from 'react';
import { Grid } from '@mui/material';
import StageList from '../components/Canvas/StageList/StageList';
import Container from '../components/Layout/Container/Container';
import Header from '../components/Layout/Header/Header';
import Footer from '../components/Layout/Footer/Footer';
import Main from '../components/Layout/Main/Main';
import Assets from '../components/Assets/Assets/Assets';

function Editor() {
  return (
    <Container>
      <Header>Here is header</Header>

      <Main>
        <Grid lg={3} item container>
          <Assets />
        </Grid>

        <Grid item lg={9}>
          <StageList />
        </Grid>
      </Main>

      <Footer>Here is footer</Footer>
    </Container>
  );
}

export default Editor;
