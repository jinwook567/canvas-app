import React, { useRef, useState } from 'react';
import { Link, Grid } from '@mui/material';
import {
  AssetSection,
  CanvasSection,
  Footer,
  Header,
  Layout,
  Main,
  Sticky,
  StickyControlBar,
  TopControlBar,
  useControl,
  useShortcut,
  VerticalWorkspace,
} from 'widgets/workspace';
import { mockWs, root } from 'widgets/workspace/model/mock';
import { Panel, Tab } from 'widgets/asset';
import { NodeElement } from 'shared/canvas';

type Props = {};

function Editor({}: Props) {
  const control = useControl(mockWs);
  const [selectedTab, setSelectedTab] = useState<'image' | 'figure'>('figure');
  const ref = useRef<() => NodeElement[]>(() => []);
  useShortcut(control);

  return (
    <Layout>
      <Header>
        <TopControlBar control={control} elements={() => ref.current()} />
      </Header>
      <Main>
        <AssetSection>
          <Tab onClick={type => setSelectedTab(type)} value={selectedTab} />
          <Grid flex={1} padding={2}>
            <Panel onClick={control.insert} type={selectedTab} />
          </Grid>
        </AssetSection>

        <CanvasSection onClick={control.clearSelect}>
          <Sticky>
            <StickyControlBar control={control} />
          </Sticky>
          <VerticalWorkspace
            workspace={control.workspace}
            onChange={control.change}
            onSelect={control.select}
            root={root}
            selectedIds={control.selectedIds}
            ref={ref}
          />
        </CanvasSection>
      </Main>
      <Footer>
        <Link href="https://github.com/jinwook567/canvas-app">canvas-app</Link>
      </Footer>
    </Layout>
  );
}

export default Editor;
