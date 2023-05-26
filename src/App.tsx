import React from 'react';
import { pipe } from 'ramda';
import { Grid, Link } from '@mui/material';
import Konva from 'konva';
import Layout from './components/common/Layout/Layout';
import Asset from './pages/editor/asset/Asset/Asset';
import GlobalEffect from './pages/editor/GlobalEffect/GlobalEffect';
import Header from './pages/editor/Header/Header';
import List from './pages/editor/List/List';
import useDownload from './hooks/editor/stage/useDownload';
import useMultipleRef from './hooks/useMultipleRef';

function App() {
  const { setRef, mapRef } = useMultipleRef<Konva.Layer | null>();
  const { requestExport } = useDownload();

  const exportZip = pipe(
    () => mapRef((id, node) => ({ url: node.toDataURL(), name: id })),
    requestExport
  );

  return (
    <Layout>
      <GlobalEffect />
      <Layout.Header>
        <Header onRequestExport={exportZip} />
      </Layout.Header>

      <Layout.Main>
        <Grid lg={3} item>
          <Asset />
        </Grid>

        <Grid item sx={{ flex: 1 }}>
          <List setRef={setRef} />
        </Grid>
      </Layout.Main>

      <Layout.Footer>
        <Link href="https://github.com/jinwook567/canvas-app">canvas-app</Link>
      </Layout.Footer>
    </Layout>
  );
}

export default App;
