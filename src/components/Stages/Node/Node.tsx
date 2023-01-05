import React, { MutableRefObject, useRef } from 'react';
import { KonvaNodeEvents } from 'react-konva';
import ShapePicker from '../ShapePicker/ShapePicker';
import { IsPressedKey, KonvaNode, KonvaRef } from '../../../types/editor';
import useEditor from '../../../hooks/useEditor';

type Props = {
  node: KonvaNode;
  isPressedKeyRef: MutableRefObject<IsPressedKey>;
};

function Node({ node, isPressedKeyRef }: Props) {
  const nodeRef = useRef<KonvaRef>(null);

  const { selectShape } = useEditor();

  const nodeEvents: KonvaNodeEvents = {
    onClick: () => {
      selectShape({
        id: node.id,
        type: isPressedKeyRef.current.Shift ? 'append' : 'change',
      });
    },
  };

  return <ShapePicker node={node} nodeEvents={nodeEvents} nodeRef={nodeRef} />;
}

export default Node;
