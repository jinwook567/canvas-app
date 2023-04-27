import React, { useRef, RefObject } from 'react';
import Konva from 'konva';

type Props = {
  children: (ref: RefObject<Konva.Node | null>) => React.ReactNode;
};

function NodeProvider({ children }: Props) {
  const ref = useRef<Konva.Node>(null);
  return children(ref);
}

export default NodeProvider;
