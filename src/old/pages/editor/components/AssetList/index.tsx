import { Grid, Typography } from '@mui/material';
import Gallery from 'shared/ui/Gallery';
import AssetItem from 'old/pages/editor/components/AssetItem';
import React from 'react';
import { Node } from 'old/utils/editor/node';

type UIType = 'horizontal' | 'vertical' | 'mansory';

export type Props = {
  assets: { type: UIType; nodes: (Node | string)[]; name?: string }[];
  addAsset: (node: Node) => void;
};

function AssetList({ assets, addAsset }: Props) {
  return (
    <Grid rowGap={20} sx={{ width: '100%' }}>
      {assets.map(({ type, nodes, name }, index) => (
        <Gallery key={index}>
          {name && (
            <Grid mb={1}>
              <Typography variant="body1">{name}</Typography>
            </Grid>
          )}
          <RenderType type={type}>
            {nodes.map((node, index) => (
              <AssetItem key={index} node={node} onClick={addAsset} />
            ))}
          </RenderType>
        </Gallery>
      ))}
    </Grid>
  );
}

type RenderTypeProps = {
  children: NonNullable<React.ReactNode>;
  type: UIType;
};

function RenderType({ children, type }: RenderTypeProps) {
  return type === 'horizontal' ? (
    <Gallery.Horizontal>{children}</Gallery.Horizontal>
  ) : type === 'mansory' ? (
    <Gallery.Mansory>{children}</Gallery.Mansory>
  ) : (
    <Grid container flexDirection="column" alignItems="center" rowGap={2}>
      {children}
    </Grid>
  );
}

export default AssetList;
