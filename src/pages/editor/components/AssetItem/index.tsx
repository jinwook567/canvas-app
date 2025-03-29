import React from 'react';
import { Paper, Typography } from '@mui/material';
import { DivSize } from 'shared/ui';
import Gallery from 'shared/ui/Gallery';
import PreviewShape from 'components/editor/PreviewShape';
import PreviewStage from 'components/editor/PreviewStage';
import useImage from 'use-image';
import { Node, Stage, Shape, Text, nodeFactory } from 'utils/editor/node';

type Props = {
  node: Node | string;
  onClick: (node: Node) => void;
};

function AssetItem({ node, onClick }: Props) {
  if (typeof node === 'string')
    return <AssetImage node={node} onClick={onClick} />;
  return (
    <Gallery.Item onClick={() => onClick(node)}>
      {node.type === 'text' ? (
        <AssetText node={node} />
      ) : node.type === 'stage' ? (
        <AssetTemplate node={node} />
      ) : (
        <AssetFigure node={node} />
      )}
    </Gallery.Item>
  );
}

function AssetImage({ node, onClick }: Props) {
  const src = node as string;
  const [image] = useImage(src, 'anonymous');

  return (
    <Gallery.Item
      onClick={() =>
        image &&
        onClick(
          nodeFactory('image').map(() => ({
            image,
            width: image.width,
            height: image.height,
          }))
        )
      }
    >
      <img src={src} alt="asset" style={{ width: '100%' }} />
    </Gallery.Item>
  );
}

function AssetTemplate({ node }: Pick<Props, 'node'>) {
  return (
    <DivSize inherit>
      {size => (
        <Paper elevation={2}>
          <PreviewStage
            stage={node as Stage}
            parentSize={{
              width: size.width,
              height: Math.max(size.width, size.height),
            }}
          />
        </Paper>
      )}
    </DivSize>
  );
}

function AssetFigure({ node }: Pick<Props, 'node'>) {
  return (
    <DivSize inherit>
      {size => (
        <PreviewShape
          shape={node as Shape}
          parentSize={{
            width: size.width,
            height: Math.max(size.width, size.height),
          }}
        />
      )}
    </DivSize>
  );
}

function AssetText({ node }: Pick<Props, 'node'>) {
  const textNode = node as Text;
  return (
    <Typography fontSize={textNode.config.fontSize} color="primary">
      {textNode.config.text}
    </Typography>
  );
}

export default AssetItem;
