import React, {
  ForwardedRef,
  forwardRef,
  PropsWithChildren,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { elements, LayerConfig, LayerElement, Layer } from 'entities/layer';
import {
  TransformerElement,
  Transformer,
  UpdateConfig,
  TransformerConfig,
} from 'entities/transformer';
import { LayerChild } from './types';
import { useRefs } from 'shared/dom';

type Props = LayerConfig<LayerChild> & {
  onTransform?: (elements: LayerChild[]) => void;
};

function Component(
  props: PropsWithChildren<Props>,
  ref: ForwardedRef<LayerElement>
) {
  const transformers = elements(props).filter(el => el.type === 'transformer');

  const { update, get } = useRefs<TransformerElement>();

  const layerRef = useRef<LayerElement>(null);
  useImperativeHandle(ref, () => layerRef.current!);

  useEffect(() => {
    transformers.forEach(transformer => {
      const transformerRef = get(transformer.id);
      if (transformerRef) {
        const nodes =
          layerRef.current?.children.filter(el =>
            transformer.elements.includes(el.id)
          ) ?? [];
        transformerRef.update(() => nodes);
      }
    });
  }, [transformers]);

  const handleTransform = (
    updateConfig: UpdateConfig,
    transformerConfig: TransformerConfig
  ) => {
    if (props.onTransform) {
      props.onTransform(
        elements(props)
          .filter(element => transformerConfig.elements.includes(element.id))
          .map(element => ({ ...element, ...updateConfig }))
      );
    }
  };

  return (
    <Layer {...props}>
      {props.children}
      {transformers.map(config => (
        <Transformer
          {...config}
          onChange={e => handleTransform(e, config)}
          ref={node => node && update(config.id, node)}
        />
      ))}
    </Layer>
  );
}

export default forwardRef(Component);
