import React, { useState } from 'react';
import Toggle from 'components/common/Toggle';
import { Grid } from '@mui/material';
import AssetTab, {
  Props as AssetTabProps,
} from 'pages/editor/_components/AssetTab';
import AssetList from 'pages/editor/_components/AssetList';
import {
  figureAsset,
  imageAsset,
  templateAsset,
  textAsset,
} from 'pages/editor/_components/Controller/constant';
import useSelect from 'hooks/editor/stage/useSelect';
import useAdd from 'hooks/editor/node/useAdd';
import useTransform from 'hooks/editor/stage/useTransform';
import { isShape, Node } from 'utils/editor/node';

function Controller() {
  const [selectedTab, setSelectedTab] =
    useState<AssetTabProps['selectedTab']>('이미지');

  const assetList = [
    { type: '이미지', assets: imageAsset },
    { type: '템플릿', assets: templateAsset },
    { type: '텍스트', assets: textAsset },
    { type: '도형', assets: figureAsset },
  ];

  const { selectedStage } = useSelect();
  const { addNodeToStage } = useAdd();
  const { applyTemplate } = useTransform();

  const addAsset = (node: Node) => {
    if (selectedStage) {
      if (isShape(node)) addNodeToStage(node, selectedStage);
      else applyTemplate(node, selectedStage);
    }
  };

  return (
    <Grid container>
      <AssetTab selectedTab={selectedTab} onSelect={setSelectedTab} />
      <Grid flex={1} padding={2}>
        <Toggle selectedType={selectedTab} show>
          {assetList.map(assetData => (
            <Grid key={assetData.type}>
              <Toggle.Item key={assetData.type} type={assetData.type}>
                <AssetList assets={assetData.assets} addAsset={addAsset} />
              </Toggle.Item>
            </Grid>
          ))}
        </Toggle>
      </Grid>
    </Grid>
  );
}

export default Controller;
