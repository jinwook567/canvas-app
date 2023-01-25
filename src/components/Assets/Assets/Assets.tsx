import React, { ReactElement, useState } from 'react';
import { Grid } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import GridViewIcon from '@mui/icons-material/GridView';
import AssetTab from '../AssetTab/AssetTab';
import ImageAssets from '../Image/ImageAssetList/ImageAssetList';
import TextAssetList from '../Text/TextAssetList/TextAssetList';
import TemplateList from '../Template/TemplateList/TemplateList';

function Assets() {
  const assetsList = {
    이미지: <ImageAssets />,
    템플릿: <TemplateList />,
    텍스트: <TextAssetList />,
  };

  const tabList: { icon: ReactElement; name: keyof typeof assetsList }[] = [
    { icon: <GridViewIcon fontSize="small" />, name: '템플릿' },
    { icon: <ImageIcon fontSize="small" />, name: '이미지' },
    { icon: <FormatColorTextIcon fontSize="small" />, name: '텍스트' },
  ];

  const [selectedTab, setSelectedTab] = useState(tabList[0].name);

  return (
    <Grid container flexDirection="row">
      <AssetTab
        tabList={tabList}
        onClick={name => setSelectedTab(name as keyof typeof assetsList)}
        selectedTab={selectedTab}
      />
      <Grid flex={1} padding={2}>
        {assetsList[selectedTab]}
      </Grid>
    </Grid>
  );
}

export default Assets;
