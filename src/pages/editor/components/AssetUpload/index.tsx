import React from 'react';
import { Button, Grid } from '@mui/material';
import ImageUpload from 'components/editor/ImageUpload';
import AssetList from 'pages/editor/components/AssetList';
import { Node } from 'utils/editor/node';
import FileUpload from '@mui/icons-material/FileUpload';

type Props = {
  onUpload: (image: string) => void;
  uploadedAssets: string[];
  onClick: (node: Node) => void;
};

function AssetUpload({ onClick, onUpload, uploadedAssets }: Props) {
  return (
    <Grid container flexDirection="column" alignItems="center" rowGap={3}>
      <Button
        variant="outlined"
        sx={{ borderRadius: '4px' }}
        startIcon={<FileUpload />}
        component="label"
      >
        이미지 업로드
        <ImageUpload onComplete={onUpload} />
      </Button>

      <AssetList
        assets={[{ type: 'mansory', nodes: uploadedAssets }]}
        addAsset={onClick}
      />
    </Grid>
  );
}

export default AssetUpload;
