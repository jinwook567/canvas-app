import React from 'react';
import PreviewStage from 'old/components/editor/PreviewStage';
import { nodeFactory, Shape } from 'old/utils/editor/node';
import { Size } from 'old/utils/editor/size';

type Props = {
  shape: Shape;
  parentSize: Size;
};

function PreviewShape({ shape, parentSize }: Props) {
  const stage = nodeFactory('stage')
    .map(() => shape.bounds.size)
    .addChild(shape.map(config => ({ ...config, x: 0, y: 0 })));

  return <PreviewStage stage={stage} parentSize={parentSize} />;
}

export default React.memo(PreviewShape);
