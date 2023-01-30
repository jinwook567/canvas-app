/* eslint-disable react/jsx-props-no-spreading */
import React, { RefObject, useRef } from 'react';
import Konva from 'konva';
import { Group as ReactKonvaGroup } from 'react-konva';
import { KonvaNodeConfig } from '../../../types/editor';
import useUpdateTransformerBySelectedId from './useUpdateTransformerRef';
import Image from '../Image/Image';
import useNodeEvents from './useNodeEvents';
import Text from '../Text/Text';

type Props = {
  node: KonvaNodeConfig;
  trRef: RefObject<Konva.Transformer>;
  isSelected: boolean;
};

function Node({ node, trRef, isSelected }: Props) {
  const nodeRef = useRef(null);

  useUpdateTransformerBySelectedId({
    isSelected,
    trRef,
    nodeRef,
  });

  const nodeEvents = useNodeEvents(node);

  const props = {
    draggable: true,
    ...nodeEvents,
    ref: nodeRef,
  };

  switch (node.type) {
    case 'image':
      return <Image {...props} {...node} />;

    case 'group':
      return (
        <ReactKonvaGroup {...props} {...node}>
          {node.children.map(child => (
            <Node
              key={child.id}
              node={{
                ...child,
                draggable: false,
              }}
              trRef={trRef}
              isSelected={false}
            />
          ))}
        </ReactKonvaGroup>
      );

    case 'text':
      return <Text {...props} {...node} isSelected={isSelected} />;

    default:
      return null;
  }
}

export default Node;
