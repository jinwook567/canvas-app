import React, { useState } from 'react';
import { Grid } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import GridViewIcon from '@mui/icons-material/GridView';
import AssetTab from '../AssetTab/AssetTab';
import ImageAssetList from '../Image/ImageAssetList/ImageAssetList';
import TextAssetList from '../Text/TextAssetList/TextAssetList';
import TemplateList from '../Template/TemplateList/TemplateList';

function Assets() {
  const assetsList = {
    이미지: {
      icon: <GridViewIcon fontSize="small" />,
      component: <ImageAssetList />,
    },
    템플릿: {
      icon: <ImageIcon fontSize="small" />,
      component: <TemplateList />,
    },
    텍스트: {
      icon: <FormatColorTextIcon fontSize="small" />,
      component: <TextAssetList />,
    },
  };

  const tabList = Object.entries(assetsList).map(([name, { icon }]) => ({
    name: name as keyof typeof assetsList,
    icon,
  }));

  const [selectedTab, setSelectedTab] = useState(tabList[0].name);

  return (
    <Grid container flexDirection="row">
      <AssetTab
        tabList={tabList}
        onClick={name => setSelectedTab(name)}
        selectedTab={selectedTab}
      />
      <Grid flex={1} padding={2}>
        {assetsList[selectedTab].component}
      </Grid>
    </Grid>
  );
}

export default Assets;
