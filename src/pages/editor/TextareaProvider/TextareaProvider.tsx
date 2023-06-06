import React, { useState, useEffect } from 'react';
import { Group } from 'react-konva';
import HtmlProvider from '../../../components/editor/HtmlProvider/HtmlProvider';
import Textarea from '../../../components/editor/Textarea/Textarea';
import useSelect from '../../../hooks/editor/node/useSelect';
import useTransform from '../../../hooks/editor/node/useTransform';
import { Text } from '../../../utils/editor/node';

type Props = {
  children: React.ReactNode;
  text: Text;
  absPos: { x: number; y: number };
};

function TextareaProvider({ children, text, absPos }: Props) {
  const [show, setShow] = useState(false);
  const { isSelected: checkIsSelected } = useSelect();
  const isSelected = checkIsSelected(text);
  const { transformNodes } = useTransform();

  useEffect(() => {
    if (!isSelected) setShow(false);
  }, [isSelected]);

  const handleChange = (textValue: string) => {
    transformNodes([text.map(config => ({ ...config, text: textValue }))]);
  };

  return (
    <HtmlProvider
      show={isSelected && show}
      pos={absPos}
      html={
        <Textarea
          style={Textarea.style(text.bounds, text.config)}
          onChange={handleChange}
          text={text.config.text || ''}
        />
      }
    >
      <Group onDblClick={() => setShow(true)}>{children}</Group>
    </HtmlProvider>
  );
}

export default TextareaProvider;
