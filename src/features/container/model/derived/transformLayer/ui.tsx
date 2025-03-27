import React, {
  ForwardedRef,
  PropsWithChildren,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { TransformLayerConfig, toLayer } from './model';
import { Layer, LayerElement } from 'entities/layer';
import { Transformer, TransformerElement } from 'entities/transformer';
import { useRefs } from 'shared/dom';

type Props<Child> = TransformLayerConfig<Child> & { onChange: () => void };

function TransformLayer<Child>(
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
        const nextNodes =
          layerRef.current?.children.filter(el =>
            transformer.elements.includes(el.id)
          ) ?? [];
        transformerRef.update(() => nextNodes);
      }
    });
  }, [props.transformers]);

  return (
    <Layer {...toLayer(props)}>
      {props.children}
      {props.transformers.map(config => (
        <Transformer
          {...config}
          onChange={props.onChange}
          ref={node => node && update(config.id, node)}
        />
      ))}
    </Layer>
  );
}

export default TransformLayer;
