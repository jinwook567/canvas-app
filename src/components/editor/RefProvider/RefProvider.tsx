import React, { useRef, MutableRefObject } from 'react';
import Konva from 'konva';

type Props = {
  children: (ref: MutableRefObject<Konva.Node | null>) => React.ReactNode;
};

function RefProvider<Node extends Konva.Node>({ children }: Props) {
  const ref = useRef<Node>(null);
  return <>{children(ref)}</>;
}

export default RefProvider;
