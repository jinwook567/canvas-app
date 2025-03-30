import React from 'react';
import { Layer } from 'react-konva';
import KonvaMatcher from 'old/components/editor/KonvaMatcher';
import ResponsiveStage from 'old/components/editor/ResponsiveStage';
import { hasChildren, Stage } from 'old/utils/editor/node';
import { Size } from 'old/utils/editor/size';

type Props = {
  stage: Stage;
  parentSize: Size;
};

function PreviewStage({ stage, parentSize }: Props) {
  return (
    <ResponsiveStage
      parentSize={parentSize}
      size={stage.bounds.size}
      parentRatio={1}
    >
      <Layer>
        {stage.children.map(child => (
          <KonvaMatcher
            key={child.id}
            id={child.id}
            component={child.component}
            config={child.config}
            childNodes={hasChildren(child) ? child.children : undefined}
          />
        ))}
      </Layer>
    </ResponsiveStage>
  );
}

export default React.memo(PreviewStage);
