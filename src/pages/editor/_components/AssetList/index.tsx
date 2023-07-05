/* eslint-disable no-nested-ternary */
import { Grid, Typography } from '@mui/material';
import Asset from 'components/editor/Asset';
import AssetItem from 'pages/editor/_components/AssetItem';
import React from 'react';
import { Node } from 'utils/editor/node';

type UIType = 'horizontal' | 'vertical' | 'mansory';

export type Props = {
  assets: { type: UIType; nodes: (Node | string)[]; name?: string }[];
  addAsset: (node: Node) => void;
};

function AssetList({ assets, addAsset }: Props) {
  return (
    <Grid rowGap={20}>
      {assets.map(({ type, nodes, name }, index) => (
        <Asset key={index}>
          <RenderType type={type}>
            {name && <Typography variant="h3">{name}</Typography>}
            {nodes.map((node, index) => (
              <AssetItem key={index} node={node} onClick={addAsset} />
            ))}
          </RenderType>
        </Asset>
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
    <Asset.Horizontal>{children}</Asset.Horizontal>
  ) : type === 'mansory' ? (
    <Asset.Mansory>{children}</Asset.Mansory>
  ) : (
    <Grid container flexDirection="column" alignItems="center" rowGap={2}>
      {children}
    </Grid>
  );
}

export default AssetList;