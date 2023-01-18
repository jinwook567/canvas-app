/* eslint-disable react/jsx-props-no-spreading */
import Konva from 'konva';
import React, { ForwardedRef, useEffect, useRef } from 'react';
import { KonvaTextNode } from '../../../types/editor';
import * as Styled from './Textarea.styles';

type Props = KonvaTextNode & {
  textRef: ForwardedRef<Konva.Text>;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

function Textarea({ textRef, onChange, ...props }: Props) {
  const sizeRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (textRef && typeof textRef !== 'function' && textRef.current) {
      sizeRef.current = {
        width: textRef.current.textWidth * props.scaleX,
        height: textRef.current.textHeight * props.text.split('\n').length,
      };
    }
  }, [
    props.text,
    props.fontSize,
    props.fontFamily,
    props.align,
    props.lineHeight,
  ]);

  return (
    <Styled.TextArea
      {...props}
      width={sizeRef.current.width}
      height={sizeRef.current.height}
      value={props.text}
      onChange={onChange}
    />
  );
}

export default Textarea;
