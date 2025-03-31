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
} from 'entities/transformer';
import { useRefs } from 'shared/dom';
import { NodeConfig } from 'shared/canvas';

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
        transformerRef.update(nodes);
      }
    });
  }, [props.transformers]);

  const handleTransform = (updateConfigs: UpdateConfig[]) => {
    if (props.onTransform) {
      props.onTransform(
        updateConfigs.map(config => {
          const element = props.elements.find(el => el.id === config.id)!;
          return { ...element, ...config };
        })
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
          onChange={handleTransform}
          ref={node => node && update(config.id, node)}
        />
      ))}
    </Layer>
  );
}

export default forwardRef(TransformLayer);
