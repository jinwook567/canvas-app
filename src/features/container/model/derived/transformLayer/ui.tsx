import React, {
  ForwardedRef,
  forwardRef,
  PropsWithChildren,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { TransformLayerConfig, toLayer } from './model';
import { Layer, LayerElement } from 'entities/layer';
import {
  Transformer,
  TransformerElement,
  UpdateConfig,
  TransformerConfig,
} from 'entities/transformer';
import { useRefs } from 'shared/dom';
import { NodeConfig, TransformConfig } from 'shared/canvas';

type Props<Child extends NodeConfig> = TransformLayerConfig<Child> & {
  onTransform?: (elements: Child[]) => void;
};

function TransformLayer<Child extends NodeConfig>(
  props: PropsWithChildren<Props<Child>>,
  ref: ForwardedRef<LayerElement>
) {
  const { update, get } = useRefs<TransformerElement>();

  const layerRef = useRef<LayerElement>(null);

  useImperativeHandle(ref, () => layerRef.current!);

  useEffect(() => {
    props.transformers.forEach(transformer => {
      const transformerRef = get(transformer.id);
      if (transformerRef) {
        const nodes =
          layerRef.current?.children.filter(el =>
            transformer.elements.includes(el.id)
          ) ?? [];
        transformerRef.update(() => nodes);
      }
    });
  }, [props.transformers]);

  const handleTransform = (
    updateConfig: TransformConfig,
    transformerConfig: TransformerConfig
  ) => {
    if (props.onTransform) {
      props.onTransform(
        props.elements
          .filter(element => transformerConfig.elements.includes(element.id))
          .map(element => ({ ...element, ...updateConfig }))
      );
    }
  };

  return (
    <Layer {...toLayer(props)} ref={layerRef}>
      {props.children}
      {props.transformers.map(config => (
        <Transformer
          {...config}
          key={config.id}
          onChange={updateConfig => {
            console.log({ updateConfig });
            handleTransform(updateConfig, config);
          }}
          ref={node => node && update(config.id, node)}
        />
      ))}
    </Layer>
  );
}

export default forwardRef(TransformLayer);
