import React, { RefObject, useEffect, useRef } from 'react';
import { KonvaNodeEvents } from 'react-konva';
import Konva from 'konva';
import ShapePicker2, {
  Props as ShapePickerProps,
} from '../ShapePicker/ShapePicker2';

type Props =
  | ({
      type: 'image';
      config: Konva.ImageConfig;
      src?: string;
      isSelected: boolean;
      updateTransformer: (ref: RefObject<Konva.Image>) => void;
    } & KonvaNodeEvents)
  | ({
      type: 'text';
      config: Konva.TextConfig;
      isSelected: boolean;
      updateTransformer: (ref: RefObject<Konva.Text>) => void;
    } & KonvaNodeEvents)
  | ({
      type: 'group';
      config: Konva.GroupConfig;
      nodes: ShapePickerProps[];
      isSelected: boolean;
      updateTransformer: (ref: RefObject<Konva.Group>) => void;
    } & KonvaNodeEvents);

function Node(props: Props) {
  const { isSelected, updateTransformer, ...rest } = props;
  const nodeRef = useRef(null);

  useEffect(() => {
    updateTransformer(nodeRef);
  }, [isSelected]);

  return <ShapePicker2 {...rest} nodeRef={nodeRef} />;
}

export default Node;
