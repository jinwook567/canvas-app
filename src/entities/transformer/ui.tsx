import React, { ForwardedRef, forwardRef } from 'react';
import Konva from 'konva';
import {
  TransformerConfig,
  TransformerElement,
  UpdateConfig,
  toTransformerElement,
  toUpdateConfigs,
} from './model';
import * as ReactKonva from 'react-konva';
import { setRef } from 'shared/lib';

type Props = TransformerConfig & {
  onChange: (updateConfigs: UpdateConfig[]) => void;
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
      onTransformEnd={e =>
        onChange(toUpdateConfigs(e.currentTarget as Konva.Transformer))
      }
      onDragEnd={e =>
        onChange(toUpdateConfigs(e.currentTarget as Konva.Transformer))
      }
      ref={node => node && setRef(ref, toTransformerElement(node))}
    />
  );
}

export default forwardRef(Transformer);
