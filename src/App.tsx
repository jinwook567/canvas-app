import { Grid, Link } from '@mui/material';
import React from 'react';
import Layout from './components/common/Layout/Layout';
import Asset from './components/editor/asset/Asset/Asset';
import GlobalEffect from './components/editor/GlobalEffect/GlobalEffect';
import Header from './components/editor/Header/Header';
import List from './components/editor/List/List';

function App() {
  return (
    <Layout>
      <GlobalEffect />
      <Layout.Header>
        <Header />
      </Layout.Header>

      <Layout.Main>
        <Grid lg={3} item>
          <Asset />
        </Grid>

        <Grid lg={9} item>
          <List />
        </Grid>
      </Layout.Main>

      <Layout.Footer>
        <Link href="https://github.com/jinwook567/canvas-app">canvas-app</Link>
      </Layout.Footer>
    </Layout>
  );
}

export default App;
