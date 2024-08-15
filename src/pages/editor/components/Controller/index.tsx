import React, { useState } from 'react';
import { Toggle } from 'shared/ui';
import AssetList from 'pages/editor/components/AssetList';
import {
  figureAsset,
  imageAsset,
  templateAsset,
  textAsset,
} from 'pages/editor/components/Controller/constant';
import useSelect from 'hooks/editor/stage/useSelect';
import useAdd from 'hooks/editor/node/useAdd';
import useTransform from 'hooks/editor/stage/useTransform';
import { isShape, Node } from 'utils/editor/node';
import AssetUpload from 'pages/editor/components/AssetUpload';
import { useRecoilValue } from 'recoil';
import { selectedTabState, tabValue } from 'recoils/editor/atoms';
import PositionHandler from 'pages/editor/components/PositionHandler';

function Controller() {
  const selectedTab = useRecoilValue(selectedTabState);

  const assetList = [
    { type: tabValue.assetImage, assets: imageAsset },
    { type: tabValue.assetTemplate, assets: templateAsset },
    { type: tabValue.assetText, assets: textAsset },
    { type: tabValue.assetFigure, assets: figureAsset },
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

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const handleUpload = (uploadedImage: string) => {
    setUploadedImages(uploadedImages => [...uploadedImages, uploadedImage]);
  };

  const selectedType = () => selectedTab;

  return (
    <Toggle selectedType={selectedType()} show>
      {assetList.map(assetData => (
        <Toggle.Item key={assetData.type} type={assetData.type}>
          <AssetList assets={assetData.assets} addAsset={addAsset} />
        </Toggle.Item>
      ))}
      <Toggle.Item type="asset-upload">
        <AssetUpload
          onClick={addAsset}
          uploadedAssets={uploadedImages}
          onUpload={handleUpload}
        />
      </Toggle.Item>
      <Toggle.Item type={tabValue.handlerPosition}>
        <PositionHandler />
      </Toggle.Item>
    </Toggle>
  );
}

export default Controller;
