import React from 'react';
import GridViewIcon from '@mui/icons-material/GridView';
import ImageIcon from '@mui/icons-material/Image';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import { Grid } from '@mui/material';
import useTabs from '../../common/Tabs/useTabs';
import ImageAsset from './ImageAsset/ImageAsset';
import TemplateAsset from './TemplateAsset/TemplateAsset';
import TextAsset from './TextAsset/TextAsset';

function Asset() {
  const asset = [
    {
      tab: { label: '이미지', icon: <ImageIcon /> },
      component: <ImageAsset />,
    },
    {
      tab: { label: '템플릿', icon: <GridViewIcon /> },
      component: <TemplateAsset />,
    },
    {
      tab: { label: '텍스트', icon: <FormatColorTextIcon /> },
      component: <TextAsset />,
    },
  ];

  const [selectedIndex, renderTabs] = useTabs({
    orientation: 'vertical',
    items: asset.map(item => item.tab),
  });

  return (
    <Grid container>
      {renderTabs()}
      <Grid flex={1} padding={2}>
        {asset[selectedIndex].component}
      </Grid>
    </Grid>
  );
}

export default Asset;
