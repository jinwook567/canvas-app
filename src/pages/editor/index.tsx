import React from 'react';
import { Grid, Link } from '@mui/material';
import Konva from 'konva';
import { pipe } from 'ramda';
import useDownload from 'hooks/editor/stage/useDownload';
import { useMultipleRef } from 'shared/dom';
import GlobalEffect from 'pages/editor/components/GlobalEffect';
import Header from 'pages/editor/components/Header';
import StageList from 'pages/editor/components/StageList';
import useCreateInitialStage from 'pages/editor/components/StageList/useInitial';
import Controller from 'pages/editor/components/Controller';
import * as Styled from './index.styles';
import AssetTab from 'pages/editor/components/AssetTab';
import ShapeControlBar from 'pages/editor/components/ShapeControlBar';

function Editor() {
  const { setRef, mapRef } = useMultipleRef<Konva.Layer | null>();
  const { requestExport } = useDownload();

  const exportZip = pipe(
    () => mapRef((id, node) => ({ url: node.toDataURL(), name: id })),
    requestExport
  );

  const stages = useCreateInitialStage();

  return (
    <Styled.Container>
      <GlobalEffect />
      <Styled.Header>
        <Header onRequestExport={exportZip} />
      </Styled.Header>

      <Styled.Main>
        <Grid lg={3} container item>
          <AssetTab />
          <Grid flex={1} padding={2}>
            <Controller />
          </Grid>
        </Grid>

        <Grid flex={1}>
          <Styled.CanvasSection>
            <Styled.StickyContainer>
              <ShapeControlBar />
            </Styled.StickyContainer>

            <StageList setRef={setRef} items={stages} />
          </Styled.CanvasSection>
        </Grid>
      </Styled.Main>

      <Styled.Footer>
        <Link href="https://github.com/jinwook567/canvas-app">canvas-app</Link>
      </Styled.Footer>
    </Styled.Container>
  );
}

export default Editor;
