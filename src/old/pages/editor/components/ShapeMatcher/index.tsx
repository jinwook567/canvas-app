import React from 'react';
import Konva from 'konva';
import { Shape, hasChildren, Text } from 'old/utils/editor/node';
import KonvaMatcher from 'old/components/editor/KonvaMatcher';
import TextareaProvider from 'old/pages/editor/components/TextareaProvider';

type Props = {
  setRef: (node: Konva.Node | null) => void;
  konvaNode: Konva.Node | null;
  shape: Shape;
};

function ShapeMatcher({ setRef, konvaNode, shape }: Props) {
  const render = () => (
    <KonvaMatcher
      setRef={setRef}
      id={shape.id}
      config={{ ...shape.config, draggable: true }}
      component={shape.component}
      childNodes={hasChildren(shape) ? shape.children : undefined}
    />
  );

  return shape.type === 'text' ? (
    <TextareaProvider
      text={shape as Text}
      absPos={konvaNode?.getAbsolutePosition() || { x: 0, y: 0 }}
    >
      {render()}
    </TextareaProvider>
  ) : (
    render()
  );
}

export default ShapeMatcher;
