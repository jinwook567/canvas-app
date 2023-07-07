import React from 'react';
import { Grid } from '@mui/material';
import ImageUpload from 'components/editor/ImageUpload';
import AssetList from 'pages/editor/components/AssetList';
import { Node } from 'utils/editor/node';

type Props = {
  onUpload: (image: string) => void;
  uploadedAssets: string[];
  onClick: (node: Node) => void;
};

function AssetUpload({ onClick, onUpload, uploadedAssets }: Props) {
  return (
    <Grid container flexDirection="column" alignItems="center" rowGap={3}>
      <ImageUpload onComplete={onUpload} />
      <AssetList
        assets={[{ type: 'mansory', nodes: uploadedAssets }]}
        addAsset={onClick}
      />
    </Grid>
  );
}

export default AssetUpload;
