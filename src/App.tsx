import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { pipe } from 'ramda';
import { Grid, Link } from '@mui/material';
import Konva from 'konva';
import Layout from './components/common/Layout/Layout';
import Asset from './pages/editor/asset/Asset/Asset';
import GlobalEffect from './pages/editor/GlobalEffect/GlobalEffect';
import Header from './pages/editor/Header/Header';
import StageList from './pages/editor/StageList/StageList';
import useDownload from './hooks/editor/stage/useDownload';
import useAdd from './hooks/editor/stage/useAdd';
import useMultipleRef from './hooks/useMultipleRef';
import { stagesState } from './recoil/editor/atoms';
import { nodeFactory } from './utils/editor/node';

function App() {
  const { setRef, mapRef } = useMultipleRef<Konva.Layer | null>();
  const { requestExport } = useDownload();

  const exportZip = pipe(
    () => mapRef((id, node) => ({ url: node.toDataURL(), name: id })),
    requestExport
  );

  const stages = useRecoilValue(stagesState);
  const { addStage } = useAdd();

  useEffect(() => {
    if (stages.length === 0)
      addStage(nodeFactory('stage').map(() => ({ width: 500, height: 500 })));
  }, [stages]);

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
          <StageList setRef={setRef} items={stages} />
        </Grid>
      </Layout.Main>

      <Layout.Footer>
        <Link href="https://github.com/jinwook567/canvas-app">canvas-app</Link>
      </Layout.Footer>
    </Layout>
  );
}

export default App;
