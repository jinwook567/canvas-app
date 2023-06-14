import React from 'react';
import PreviewStage from 'components/editor/PreviewStage';
import { nodeFactory, Shape } from 'utils/editor/node';
import { Size } from 'utils/editor/size';

type Props = {
  shape: Shape;
  parentSize: Size;
};

function PreviewShape({ shape, parentSize }: Props) {
  const stage = nodeFactory('stage')
    .map(() => ({
      width: shape.bounds.width,
      height: shape.bounds.height,
    }))
    .addChild(shape);

  return <PreviewStage stage={stage} parentSize={parentSize} />;
}

export default React.memo(PreviewShape);
