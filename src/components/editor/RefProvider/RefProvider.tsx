import React, { useRef, MutableRefObject } from 'react';
import Konva from 'konva';

type Props<Node> = {
  children: (ref: MutableRefObject<Node | undefined>) => React.ReactNode;
};

function RefProvider<Node extends Konva.Node>({ children }: Props<Node>) {
  const ref = useRef<Node>();
  return <>{children(ref)}</>;
}

export default RefProvider;
