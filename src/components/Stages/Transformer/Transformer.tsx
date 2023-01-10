import Konva from 'konva';
import React, { RefObject } from 'react';
import * as ReactKonva from 'react-konva';
import useEditor from '../../../hooks/useEditor';

type Props = {
  trRef: RefObject<Konva.Transformer>;
};

function Transformer({ trRef }: Props) {
  const { handleTransformNodes } = useEditor();
  return (
    <ReactKonva.Transformer
      ref={trRef}
      onTransformEnd={() => {
        if (!trRef.current) return;

        const transformedNodes = trRef.current.nodes().map(trNode => ({
          id: trNode.id(),
          x: trNode.x(),
          y: trNode.y(),
          scaleX: trNode.scaleX(),
          scaleY: trNode.scaleY(),
          rotation: trNode.rotation(),
        }));

        handleTransformNodes(transformedNodes);
      }}
      onDragEnd={() => {
        if (!trRef.current) return;

        const transformedNodes = trRef.current.nodes().map(trNode => ({
          id: trNode.id(),
          x: trNode.x(),
          y: trNode.y(),
        }));

        handleTransformNodes(transformedNodes);
      }}
    />
  );
}

export default Transformer;
