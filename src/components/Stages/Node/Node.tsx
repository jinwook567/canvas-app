import React, { useRef } from 'react';
import { KonvaNodeEvents } from 'react-konva';
import ShapePicker from '../ShapePicker/ShapePicker';
import { KonvaNode, KonvaRef } from '../../../types/editor';

type Props = {
  node: KonvaNode;
};

function Node({ node }: Props) {
  const nodeRef = useRef<KonvaRef>(null);

  const nodeEvents: KonvaNodeEvents = {};

  return <ShapePicker node={node} nodeEvents={nodeEvents} nodeRef={nodeRef} />;
}

export default Node;
