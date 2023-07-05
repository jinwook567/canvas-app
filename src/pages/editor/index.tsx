import React from 'react';
import { Grid, Link } from '@mui/material';
import Konva from 'konva';
import { pipe } from 'ramda';
import Layout from 'components/common/Layout';
import useDownload from 'hooks/editor/stage/useDownload';
import useMultipleRef from 'hooks/useMultipleRef';
import Asset from 'pages/editor/_components/asset/Asset';
import GlobalEffect from 'pages/editor/_components/GlobalEffect';
import Header from 'pages/editor/_components/Header';
import StageList from 'pages/editor/_components/StageList';
import useCreateInitialStage from 'pages/editor/_components/StageList/useInitial';
import Controller from 'pages/editor/_components/Controller';

function Editor() {
  const { setRef, mapRef } = useMultipleRef<Konva.Layer | null>();
  const { requestExport } = useDownload();

  const exportZip = pipe(
    () => mapRef((id, node) => ({ url: node.toDataURL(), name: id })),
    requestExport
  );

  const stages = useCreateInitialStage();

  return (
    <Layout>
      <GlobalEffect />
      <Layout.Header>
        <Header onRequestExport={exportZip} />
      </Layout.Header>

      <Layout.Main>
        <Grid lg={3} item>
          <Controller />
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

export default Editor;
