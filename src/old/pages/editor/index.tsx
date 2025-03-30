import React, { useState } from 'react';
import { Grid, Link } from '@mui/material';
import Konva from 'konva';
import { pipe } from 'ramda';
import { useMultipleRef } from 'shared/dom';
import GlobalEffect from 'old/pages/editor/components/GlobalEffect';
import Header from 'old/pages/editor/components/Header';
import StageList from 'old/pages/editor/components/StageList';
import useCreateInitialStage from 'old/pages/editor/components/StageList/useInitial';
import Controller from 'old/pages/editor/components/Controller';
import * as Styled from './index.styles';
import AssetTab from 'old/pages/editor/components/AssetTab';
import ShapeControlBar from 'old/pages/editor/components/ShapeControlBar';
import { saveBase64 } from 'shared/lib';
import { figure, image } from 'widgets/asset/model/register';
import Tab from 'widgets/asset/ui/Tab';
import Panel from 'widgets/asset/ui/Panel';
import { level, types, useControl } from 'widgets/workspace/model';
import { mockWs, root } from 'widgets/workspace/model/mock';
import { VerticalWorkspace } from 'widgets/workspace/ui';

function Editor() {
  const { setRef, mapRef } = useMultipleRef<Konva.Layer | null>();

  const exportZip = pipe(
    () =>
      mapRef((id, node) => ({
        base64: node.toDataURL(),
        name: id,
        format: 'png' as const,
      })),
    saveBase64
  );

  const stages = useCreateInitialStage();

  const [selectedTab, setSelectedTab] = useState<'image' | 'figure'>('figure');
  const {
    workspace,
    setWorkspace,
    onInsert,
    selectedIds,
    setSelectedIds,
    onRemove,
  } = useControl(mockWs);

  console.log(workspace);

  return (
    <Styled.Container>
      <GlobalEffect />
      <Styled.Header>
        <Header onRequestExport={exportZip} />
      </Styled.Header>

      <Styled.Main>
        <Grid lg={3} container item>
          <Tab onClick={type => setSelectedTab(type)} value={selectedTab} />
          {/* <AssetTab /> */}
          <Grid flex={1} padding={2}>
            {/* <Controller /> */}
            <Panel
              onClick={config => {
                onInsert(config);
              }}
              type={selectedTab}
            />
            {/* {figure.PanelComponent({ onClick: () => {} })} */}
          </Grid>
        </Grid>

        <Grid flex={1}>
          <Styled.CanvasSection>
            <Styled.StickyContainer>
              <ShapeControlBar />
              <button onClick={() => onRemove()}>삭제</button>
            </Styled.StickyContainer>
            <VerticalWorkspace
              workspace={workspace}
              onChange={setWorkspace}
              selectedIds={selectedIds}
              onSelect={id => setSelectedIds(new Set([id]))}
              root={root}
            />

            {/* <StageList setRef={setRef} items={stages} /> */}
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
