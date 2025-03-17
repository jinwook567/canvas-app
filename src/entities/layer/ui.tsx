import { LayerConfig, LayerElement } from './model';
import { ShapeConfig, toNodeElement } from 'shared/canvas';
import React, { ForwardedRef } from 'react';
import * as Konva from 'react-konva';
import { setRef, HasChildren } from 'shared/lib';

type Props<Child extends ShapeConfig> = LayerConfig<Child>;

function Layer<Child extends ShapeConfig>(
  { visible, lock, children }: HasChildren<Props<Child>>,
  ref: ForwardedRef<LayerElement>
) {
  return (
    <Konva.Layer
      visible={visible}
      listening={!lock}
      ref={node => node && setRef(ref, toNodeElement(node))}
    >
      {children}
    </Konva.Layer>
  );
}

export default React.forwardRef(Layer);
