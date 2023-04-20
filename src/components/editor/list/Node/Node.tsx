import React, { RefObject, useEffect, useRef } from 'react';
import { KonvaNodeEvents } from 'react-konva';
import Konva from 'konva';
import ShapePicker2, {
  Props as ShapePickerProps,
} from '../../../common/editor/ShapePicker/ShapePicker2';
import { ImageConfigWithoutImage } from '../../../../types/editor';

type Props =
  | ({
      type: 'image';
      config: ImageConfigWithoutImage;
      src?: string;
      isSelected: boolean;
      updateTransformer: (
        ref: RefObject<Konva.Image>,
        isSelected: boolean
      ) => void;
    } & KonvaNodeEvents)
  | ({
      type: 'text';
      config: Konva.TextConfig;
      isSelected: boolean;
      updateTransformer: (
        ref: RefObject<Konva.Text>,
        isSelected: boolean
      ) => void;
    } & KonvaNodeEvents)
  | ({
      type: 'group';
      config: Konva.GroupConfig;
      nodes: ShapePickerProps[];
      isSelected: boolean;
      updateTransformer: (
        ref: RefObject<Konva.Group>,
        isSelected: boolean
      ) => void;
    } & KonvaNodeEvents);

function Node(props: Props) {
  const { isSelected, updateTransformer, ...rest } = props;
  const nodeRef = useRef(null);

  useEffect(() => {
    updateTransformer(nodeRef, isSelected);
  }, [isSelected]);

  useEffect(() => {
    const instance = nodeRef.current;
    return () => {
      updateTransformer({ current: instance }, false);
    };
  }, []);

  const { type } = props;
  return (
    <ShapePicker2
      {...rest}
      nodeRef={nodeRef}
      {...(type === 'text' && { isSelected })}
    />
  );
}

export default Node;
