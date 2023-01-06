import Konva from 'konva';
import { useEffect, RefObject } from 'react';

type Props = {
  isSelected: boolean;
  trRef: RefObject<Konva.Transformer>;
  nodeRef: RefObject<Konva.Node>;
};

function useUpdateTransformerRef({ isSelected, trRef, nodeRef }: Props) {
  useEffect(() => {
    if (!trRef.current) return;

    const node = nodeRef.current;
    if (!node) return;

    const currentTransformerNodes = trRef.current.nodes();
    const newTransformerNodes = isSelected
      ? [...currentTransformerNodes, node]
      : currentTransformerNodes.filter(
          trNode => trNode.attrs.id !== node.attrs.id
        );

    trRef.current.nodes(newTransformerNodes);
    trRef.current.getLayer()?.batchDraw();
  }, [isSelected]);
}

export default useUpdateTransformerRef;
