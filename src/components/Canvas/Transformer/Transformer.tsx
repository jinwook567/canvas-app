import React, { RefObject } from 'react';
import { KonvaEventObject, Node, NodeConfig } from 'konva/lib/Node';
import Konva from 'konva';
import { Transformer as ReactKonvaTransformer } from 'react-konva';
import useTransform from '../../../hooks/useTransform';

type Props = {
  trRef: RefObject<Konva.Transformer>;
};

function Transformer({ trRef }: Props) {
  const { onTransformEnd } = useTransform();

  const getDraggedNodeAttrs = (node: Node<NodeConfig>) => ({
    id: node.id(),
    x: node.x(),
    y: node.y(),
  });
  const getTransformedNodeAttrs = (node: Node<NodeConfig>) => ({
    ...getDraggedNodeAttrs(node),
    scaleX: node.scaleX(),
    scaleY: node.scaleY(),
    rotation: node.rotation(),
  });

  const handleTransformEnd = (e: KonvaEventObject<Event>) => {
    if (!trRef.current) return;

    const { type } = e;
    const transformedNodes = trRef.current
      .nodes()
      .map(
        type === 'transformend' ? getTransformedNodeAttrs : getDraggedNodeAttrs
      );

    onTransformEnd(transformedNodes);
  };

  return (
    <ReactKonvaTransformer
      ref={trRef}
      onTransformEnd={handleTransformEnd}
      onDragEnd={handleTransformEnd}
    />
  );
}

export default Transformer;
