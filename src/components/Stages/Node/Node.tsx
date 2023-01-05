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
    if (isSelected && trRef.current) {
      trRef.current.nodes([
        ...trRef.current.nodes(),
        nodeRef.current as Konva.Node,
      ]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  const nodeEvents: KonvaNodeEvents = {
    onClick: () => {
      selectShape({
        id: node.id,
        type: isPressedKeyRef.current.Shift ? 'append' : 'change',
      });
    },
    onTransformEnd: () => {
      console.log('hi');
    },
  };

  return <ShapePicker node={node} nodeEvents={nodeEvents} nodeRef={nodeRef} />;
}

export default Node;
