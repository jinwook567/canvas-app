import React, { ReactNode, Ref, useEffect, useRef } from 'react';
import { TransformerElement } from '../model';
import { NodeElement } from 'shared/canvas';

type Props = {
  active: boolean;
  onActive: TransformerElement['update'];
  children: (ref: Ref<NodeElement>) => ReactNode;
};

function Transformable({ active, onActive, children }: Props) {
  const ref = useRef<NodeElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (active) {
      onActive(elements => [...elements, element]);
    } else {
      onActive(elements => elements.filter(e => e.id !== element.id));
    }
  }, [active]);

  return <>{children(ref)}</>;
}

export default Transformable;
