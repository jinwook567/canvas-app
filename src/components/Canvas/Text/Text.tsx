/* eslint-disable react/jsx-props-no-spreading */
import Konva from 'konva';
import React, { ForwardedRef, useEffect, useState } from 'react';
import { Text as ReactKonvaText } from 'react-konva';
import { Html } from 'react-konva-utils';
import useText from '../../../hooks/useText';
import { KonvaTextConfig } from '../../../types/editor';
import Textarea from './Textarea';

type Props = KonvaTextConfig & { isSelected: boolean };

function Text({ ...props }: Props, ref: ForwardedRef<Konva.Text>) {
  const [isChangingText, setIsChangingText] = useState(false);

  useEffect(() => {
    if (!props.isSelected) {
      setIsChangingText(false);
    }
  }, [props.isSelected]);

  const { changeText } = useText();
  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    changeText({ id: props.id, text: e.target.value });
  };

  return (
    <>
      {isChangingText && (
        <Html
          divProps={{
            style: {
              position: 'absolute',
              top: `${props.y - 5}px`,
              left: `${props.x - 1}px`,
            },
          }}
        >
          <Textarea {...props} textRef={ref} onChange={handleChangeText} />
        </Html>
      )}
      <ReactKonvaText
        {...props}
        ref={ref}
        onDblClick={() => setIsChangingText(true)}
        align="center"
        verticalAlign="center"
        onTransform={() => setIsChangingText(false)}
      />
    </>
  );
}

export default React.forwardRef(Text);
