import { RefObject } from 'react';
import { KonvaNodeEvents } from 'react-konva';
import Konva from 'konva';
import useSelect from '../../../../hooks/editor/node/useSelect';
import useTransform from '../../../../hooks/editor/node/useTransform';
import { omit } from '../../../../utils/unit';

function useListLayer() {
  const { isSelected } = useSelect();

  const getNodeProps = (id: string, trRef: RefObject<Konva.Transformer>) => ({
    isSelected: isSelected(id),
    updateTransformer: (
      nodeRef: RefObject<Konva.Node>,
      isSelected: boolean
    ) => {
      if (!trRef.current || !nodeRef.current) return;

      trRef.current.nodes(
        isSelected
          ? [...trRef.current.nodes(), nodeRef.current]
          : trRef.current.nodes().filter(node => node.id() !== id)
      );

      trRef.current.getLayer()?.batchDraw();
    },
  });

  const { transformNodesConfig } = useTransform();

  function getTransformerConfig(
    trRef: RefObject<Konva.Transformer>
  ): Konva.TransformerConfig & KonvaNodeEvents {
    return {
      onDragEnd: () => onTransform(),
      onTransformEnd: () => onTransform(),
    };

    function onTransform() {
      if (!trRef.current) return;

      transformNodesConfig(
        trRef.current.nodes().map(trNode => ({
          id: trNode.id(),
          config: omit(trNode.getAttrs(), 'id'),
        }))
      );
    }
  }

  return {
    getNodeProps,
    getTransformerConfig,
  };
}

export default useListLayer;
