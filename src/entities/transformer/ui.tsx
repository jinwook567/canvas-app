import React, { ForwardedRef, forwardRef } from 'react';
import {
  TransformerConfig,
  UpdateConfig,
  TransformerElement,
  toUpdateConfig,
  toTransformerElement,
} from './model';
import * as ReactKonva from 'react-konva';
import { setRef } from 'shared/lib';

type Props = TransformerConfig & {
  onChange: (config: UpdateConfig) => void;
};

function Transformer(
  { ratio, resize, rotate, flip, onChange }: Props,
  ref: ForwardedRef<TransformerElement>
) {
  return (
    <ReactKonva.Transformer
      resizeEnabled={resize}
      rotateEnabled={rotate}
      flipEnabled={flip}
      keepRatio={ratio === 'fixed'}
      onTransformEnd={e => onChange(toUpdateConfig(e.target))}
      onDragEnd={e => onChange(toUpdateConfig(e.target))}
      ref={node => node && setRef(ref, toTransformerElement(node))}
    />
  );
}

export default forwardRef(Transformer);
