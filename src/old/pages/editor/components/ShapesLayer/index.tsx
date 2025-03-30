import React from 'react';
import Konva from 'konva';
import TransformableLayer from 'old/components/editor/TransformableLayer';
import ShapeWithSelector from 'old/pages/editor/components/ShapeWithSelector';
import { Shape } from 'old/utils/editor/node';
import useTransform from 'old/hooks/editor/node/useTransform';

type Props = {
  items: Shape[];
  setRef: (layer: Konva.Layer | null) => void;
};

function ShapesLayer({ items, setRef }: Props) {
  const { transformNodes } = useTransform();

  return (
    <TransformableLayer setRef={setRef} onTransform={transformNodes}>
      {({ attachNode, detachNode }) => (
        <>
          {items.map(shape => (
            <ShapeWithSelector
              key={shape.id}
              item={shape}
              updateTransformer={(konvaNode, isSelected) =>
                isSelected ? attachNode(konvaNode) : detachNode(shape.id)
              }
            />
          ))}
        </>
      )}
    </TransformableLayer>
  );
}

export default ShapesLayer;
