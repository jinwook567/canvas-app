/* eslint-disable react/jsx-props-no-spreading */
import React, { RefObject, useRef } from 'react';
import Konva from 'konva';
import { Text } from 'react-konva';
import { KonvaNode } from '../../../types/editor';
import useUpdateTransformerBySelectedId from './useUpdateTransformerRef';
import Image from '../Image/Image';
import useNodeEvents from './useNodeEvents';

type Props = {
  node: KonvaNode;
  trRef: RefObject<Konva.Transformer>;
  isSelected: boolean;
};

function Node({ node, trRef, isSelected }: Props) {
  const nodeRef = useRef(null);

  useUpdateTransformerBySelectedId({ isSelected, trRef, nodeRef });

  const nodeEvents = useNodeEvents(node);

  const config = {
    ...node,
    ...nodeEvents,
    draggable: true,
    ref: nodeRef,
  };

  switch (node.type) {
    case 'image':
      return <Image {...config} />;

    default:
      return <Text {...config} />;
  }
}

export default Node;
