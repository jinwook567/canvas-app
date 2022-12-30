/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { KonvaNode } from '../../../types/editor';
import Image from '../Image/Image';

type Props = {
  node: KonvaNode;
};

function Node({ node }: Props) {
  const map = {
    image: <Image {...node} />,
  };
  return map[node.type];
}

export default Node;
