/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import React, { MutableRefObject } from 'react';
import { KonvaNodeEvents, Text } from 'react-konva';
import { KonvaNode, KonvaRef } from '../../../types/editor';
import Image from '../Image/Image';

type Props = {
  node: KonvaNode;
  nodeEvents: KonvaNodeEvents;
  nodeRef: MutableRefObject<KonvaRef>;
};

function ShapePicker({ node, nodeEvents, nodeRef }: Props) {
  const props = {
    ...node,
    ...nodeEvents,
    ref: (instance: KonvaRef) => {
      nodeRef.current = instance;
    },
    draggable: true,
  };

  switch (node.type) {
    case 'image': {
      return <Image {...props} />;
    }

    default:
      return <Text {...props} />;
  }
}

export default ShapePicker;
