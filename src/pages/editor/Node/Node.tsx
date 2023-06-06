import React from 'react';
import Konva from 'konva';
import { Child, hasChildren, Text } from '../../../utils/editor/node';
import KonvaMatcher from '../../../components/editor/KonvaMatcher/KonvaMatcher';
import TextareaProvider from '../TextareaProvider/TextareaProvider';

type Props = {
  setRef: (node: Konva.Node | null) => void;
  konvaNode: Konva.Node | null;
  node: Child;
};

function Node({ setRef, konvaNode, node }: Props) {
  const render = () => (
    <KonvaMatcher
      setRef={setRef}
      id={node.id}
      config={{ ...node.config, draggable: true }}
      component={node.component}
      childNodes={hasChildren(node) ? node.children : undefined}
    />
  );

  return node.type === 'text' ? (
    <TextareaProvider
      text={node as Text}
      absPos={konvaNode?.getAbsolutePosition() || { x: 0, y: 0 }}
    >
      {render()}
    </TextareaProvider>
  ) : (
    render()
  );
}

export default Node;
