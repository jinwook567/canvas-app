import React, { useRef } from 'react';
import { Layer, Transformer } from 'react-konva';
import Konva from 'konva';

export type AttachNode = <T extends Konva.Node>(node: T | null) => void;
export type DetachNode = (nodeId: string) => void;

type Props = {
  children: ({
    attachNode,
    detachNode,
  }: {
    attachNode: AttachNode;
    detachNode: DetachNode;
  }) => React.ReactNode;
  onTransform: (transformedNodes: Konva.Node[]) => void;
  setRef: (layer: Konva.Layer | null) => void;
};

function TransformableLayer({ children, onTransform, setRef }: Props) {
  const ref = useRef<Konva.Transformer>(null);

  const handleTransform = () => {
    if (ref.current) onTransform([...ref.current.nodes()]);
  };

  const batchDraw = () => {
    if (ref.current) ref.current.getLayer()?.batchDraw();
  };

  const attachNode: AttachNode = node => {
    if (!ref.current) return;
    if (!node) return;

    ref.current.nodes([...ref.current.nodes(), node]);
    batchDraw();
  };

  const detachNode: DetachNode = nodeId => {
    if (!ref.current) return;

    ref.current.nodes(ref.current.nodes().filter(node => node.id() !== nodeId));
    batchDraw();
  };

  return (
    <>
      <Layer ref={setRef}>{children({ attachNode, detachNode })}</Layer>
      <Layer>
        <Transformer
          ref={ref}
          onTransformEnd={handleTransform}
          onDragEnd={handleTransform}
        />
      </Layer>
    </>
  );
}

export default TransformableLayer;
