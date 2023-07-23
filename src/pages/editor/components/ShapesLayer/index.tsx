import React from 'react';
import Konva from 'konva';
import TransformableLayer from 'components/editor/TransformableLayer';
import ShapeWithSelector from 'pages/editor/components/ShapeWithSelector';
import { Shape } from 'utils/editor/node';
import useTransform from 'hooks/editor/node/useTransform';

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
