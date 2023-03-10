import React, { RefObject, useEffect, useRef } from 'react';
import { KonvaNodeEvents } from 'react-konva';
import Konva from 'konva';
import ShapePicker2, {
  Props as ShapePickerProps,
} from '../../common/editor/ShapePicker/ShapePicker2';
import { ImageConfigWithoutImage } from '../../../types/editor';

type Props =
  | ({
      type: 'image';
      config: ImageConfigWithoutImage;
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
