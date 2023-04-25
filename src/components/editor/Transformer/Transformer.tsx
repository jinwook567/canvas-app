import React, { RefObject, useRef } from 'react';
import Konva from 'konva';
import {
  Transformer as TransformerComponent,
  Layer as LayerComponent,
} from 'react-konva';
import useTransform from '../../../hooks/editor/node/useTransform';

type Props = {
  children: (trRef: RefObject<Konva.Transformer>) => React.ReactNode;
};

function Transformer({ children }: Props) {
  const trRef = useRef<Konva.Transformer>(null);

  const { transformNodes } = useTransform();

  const handleTransform = () => {
    if (!trRef.current) return;
    const stage = trRef.current.getStage();

    if (!stage) return;

    transformNodes(
      trRef.current
        .nodes()
        .map(trNode => ({ id: trNode.id(), config: trNode.attrs })),
      stage.id()
    );
  };

  return (
    <>
      {children(trRef)}
      <LayerComponent>
        <TransformerComponent
          ref={trRef}
          onDragEnd={handleTransform}
          onTransformEnd={handleTransform}
        />
      </LayerComponent>
    </>
  );
}

export default Transformer;
