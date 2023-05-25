import React, { useState, useEffect, ReactElement } from 'react';
import Konva from 'konva';
import { TextConfig } from 'konva/lib/shapes/Text';
import EditableText from '../../../components/editor/EditableText/EditableText';
import useTransform from '../../../hooks/editor/node/useTransform';
import { ShapeBounds } from '../../../types/editor';

type Props = {
  isSelected: boolean;
  render: ReactElement;
  config: TextConfig;
  bounds: ShapeBounds;
  node: Konva.Text | null;
};

function Text({ isSelected, render, config, bounds, node }: Props) {
  const [editable, setEditable] = useState(false);

  const { transformNodes } = useTransform();

  const handleChange = (text: string) => {
    if (!node) return;

    const stage = node.getStage();
    if (!stage) return;

    transformNodes(
      [{ id: node.id(), config: { ...config, text } }],
      stage.id()
    );
  };

  useEffect(() => {
    if (!isSelected) setEditable(false);
  }, [isSelected]);

  return (
    <EditableText
      editable={editable && isSelected}
      onChange={handleChange}
      onDbClick={() => setEditable(true)}
      render={render}
      config={config}
      bounds={bounds}
    />
  );
}

export default Text;
