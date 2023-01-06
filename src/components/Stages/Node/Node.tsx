import React, { MutableRefObject, RefObject, useEffect, useRef } from 'react';
import Konva from 'konva';
import { KonvaNodeEvents } from 'react-konva';
import ShapePicker from '../ShapePicker/ShapePicker';
import { IsPressedKey, KonvaNode, KonvaRef } from '../../../types/editor';
import useEditor from '../../../hooks/useEditor';

type Props = {
  node: KonvaNode;
  isPressedKeyRef: MutableRefObject<IsPressedKey>;
  trRef: RefObject<Konva.Transformer>;
  isSelected: boolean;
};

function Node({ node, isPressedKeyRef, trRef, isSelected }: Props) {
  const nodeRef = useRef<KonvaRef>(null);

  const { selectShape } = useEditor();

  useEffect(() => {
    if (!trRef.current) return;

    const currentTransformerNodes = trRef.current.nodes();
    const newTransformerNodes = isSelected
      ? [...currentTransformerNodes, nodeRef.current as Konva.Node]
      : currentTransformerNodes.filter(trNode => trNode.attrs.id !== node.id);

    trRef.current.nodes(newTransformerNodes);
    trRef.current.getLayer()?.batchDraw();
  }, [isSelected]);

  const nodeEvents: KonvaNodeEvents = {
    onClick: () => {
      selectShape({
        id: node.id,
        type: isPressedKeyRef.current.Shift ? 'append' : 'change',
      });
    },
    onTransformEnd: () => {},
    onDragEnd: () => {},
  };

  return <ShapePicker node={node} nodeEvents={nodeEvents} nodeRef={nodeRef} />;
}

export default Node;
