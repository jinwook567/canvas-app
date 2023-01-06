import React, { MutableRefObject, RefObject, useRef } from 'react';
import Konva from 'konva';
import { KonvaNodeEvents } from 'react-konva';
import ShapePicker from '../ShapePicker/ShapePicker';
import { IsPressedKey, KonvaNode, KonvaRef } from '../../../types/editor';
import useEditor from '../../../hooks/useEditor';
import useUpdateTransformerRef from './useUpdateTransformerRef';

type Props = {
  node: KonvaNode;
  isPressedKeyRef: MutableRefObject<IsPressedKey>;
  trRef: RefObject<Konva.Transformer>;
  isSelected: boolean;
};

function Node({ node, isPressedKeyRef, trRef, isSelected }: Props) {
  const nodeRef = useRef<KonvaRef>(null);

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
