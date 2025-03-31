import { LayerConfig, LayerElement } from './model';
import { toContainerElement } from 'shared/canvas';
import React, { ForwardedRef } from 'react';
import * as Konva from 'react-konva';
import { setRef, HasChildren } from 'shared/lib';

type Props<Child> = LayerConfig<Child>;

function Layer<Child>(
  { visible, lock, children, id }: HasChildren<Props<Child>>,
  ref: ForwardedRef<LayerElement>
) {
  return (
    <Konva.Layer
      id={id}
      visible={visible}
      listening={!lock}
      ref={node => node && setRef(ref, toContainerElement(node))}
    >
      {children}
    </Konva.Layer>
  );
}

export default React.forwardRef(Layer);
