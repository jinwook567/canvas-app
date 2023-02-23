import React, { RefObject, useRef } from 'react';
import Konva from 'konva';
import {
  Layer as KonvaLayer,
  Transformer as KonvaTransformer,
} from 'react-konva';

type Props = {
  children: (trRef: RefObject<Konva.Transformer>) => React.ReactNode;
  layerConfig?: Konva.LayerConfig;
  transformerConfig?: Konva.TransformerConfig;
};

function LayerWithTransformer({
  children,
  layerConfig,
  transformerConfig,
}: Props) {
  const trRef = useRef<Konva.Transformer>(null);
  return (
    <KonvaLayer {...layerConfig}>
      {children(trRef)}
      <KonvaTransformer ref={trRef} {...transformerConfig} />
    </KonvaLayer>
  );
}

export default LayerWithTransformer;
