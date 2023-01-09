import React, { RefObject, useRef } from 'react';
import Konva from 'konva';
import { KonvaNodeEvents } from 'react-konva';
import ShapePicker from '../ShapePicker/ShapePicker';
import { KonvaNode, KonvaRef } from '../../../types/editor';
import useEditor, { usePressedKey } from '../../../hooks/useEditor';
import useUpdateTransformerRef from './useUpdateTransformerRef';

type Props = {
  node: KonvaNode;
  trRef: RefObject<Konva.Transformer>;
  isSelected: boolean;
};

function Node({ node, trRef, isSelected }: Props) {
  const nodeRef = useRef<KonvaRef>(null);
  const isPressedKeyRef = usePressedKey();

  useUpdateTransformerRef({ isSelected, trRef, nodeRef });

  const { selectShape } = useEditor();

  const nodeEvents: KonvaNodeEvents = {
    onClick: () => {
      selectShape({
        id: node.id,
        type: isPressedKeyRef.current.Shift ? 'append' : 'change',
      });
    },
    onDragEnd: e => {},
  };

  return <ShapePicker node={node} nodeEvents={nodeEvents} nodeRef={nodeRef} />;
}

export default Node;
