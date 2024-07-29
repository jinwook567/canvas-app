import { LayerElement } from 'editor/layer/service';
import { convertNode } from 'editor/node';
import React, { ForwardedRef } from 'react';
import * as Konva from 'react-konva';
import { setRef } from 'utils/ref';
import { HasChildren } from 'utils/type-utils';

type Props = {
  visible?: boolean;
  lock?: boolean;
};

function Layer(
  { visible, lock, children }: HasChildren<Props>,
  ref: ForwardedRef<LayerElement>
) {
  return (
    <Konva.Layer
      visible={visible}
      listening={!lock}
      ref={node => node && setRef(ref, convertNode(node))}
    >
      {children}
    </Konva.Layer>
  );
}

export default React.forwardRef<LayerElement, HasChildren<Props>>(Layer);
