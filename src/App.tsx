import { Grid, Link } from '@mui/material';
import React, { useState } from 'react';
import Layout from './components/common/Layout/Layout';
import Asset from './pages/editor/asset/Asset/Asset';
import GlobalEffect from './pages/editor/GlobalEffect/GlobalEffect';
import Header from './pages/editor/Header/Header';
import List from './pages/editor/List/List';
import useDownload from './hooks/editor/stage/useDownload';

function App() {
  const [isExportRequested, setIsExportRequested] = useState(false);
  const { requestExport } = useDownload();

  return (
    <Layout>
      <GlobalEffect />
      <Layout.Header>
        <Header onRequestExport={() => setIsExportRequested(true)} />
      </Layout.Header>

      <Layout.Main>
        <Grid lg={3} item>
          <Asset />
        </Grid>

        <Grid item sx={{ flex: 1 }}>
          <List
            isExportRequested={isExportRequested}
            onExport={data => {
              requestExport(data);
              setIsExportRequested(false);
            }}
          />
        </Grid>
      </Layout.Main>

      <Layout.Footer>
        <Link href="https://github.com/jinwook567/canvas-app">canvas-app</Link>
      </Layout.Footer>
    </Layout>
  );
}

export default App;
