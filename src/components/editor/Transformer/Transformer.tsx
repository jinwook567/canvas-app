import React, { RefObject, useRef } from 'react';
import Konva from 'konva';
import {
  Transformer as TransformerComponent,
  Layer as LayerComponent,
} from 'react-konva';

type Props = {
  children: (trRef: RefObject<Konva.Transformer>) => React.ReactNode;
};

function Transformer({ children }: Props) {
  const trRef = useRef<Konva.Transformer>(null);
  return (
    <>
      {children}
      <LayerComponent>
        <TransformerComponent ref={trRef} />
      </LayerComponent>
    </>
  );
}

export default Transformer;
