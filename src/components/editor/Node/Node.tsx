import React, { RefObject, useEffect, useRef } from 'react';
import Konva from 'konva';
import ShapePicker2 from '../ShapePicker/ShapePicker2';

type Props =
  | {
      type: 'image';
      config: Konva.ImageConfig;
      src?: string;
      isSelected: boolean;
      updateTransformer: (ref: RefObject<Konva.Image>) => void;
    }
  | {
      type: 'text';
      config: Konva.TextConfig;
      isSelected: boolean;
      updateTransformer: (ref: RefObject<Konva.Text>) => void;
    }
  | {
      type: 'group';
      config: Konva.GroupConfig;
      nodes: Props[];
      isSelected: boolean;
      updateTransformer: (ref: RefObject<Konva.Group>) => void;
    };

function Node(props: Props) {
  const { isSelected, updateTransformer, ...rest } = props;
  const nodeRef = useRef(null);

  useEffect(() => {
    updateTransformer(nodeRef);
  }, [isSelected]);

  return <ShapePicker2 {...rest} nodeRef={nodeRef} />;
}

export default Node;
