import React, { useRef } from 'react';
import { Layer, Transformer } from 'react-konva';
import { Node as NodeType } from '../../../../types/editor';
import Node from '../Node/Node';
import useListLayer from './useListLayer';
import useNodeEvents from './useNodeEvents';

type Props = {
  nodes: NodeType[];
};

function ListLayerWithTransformableNodes({ nodes }: Props) {
  const trRef = useRef(null);
  const { getNodeProps, getTransformerConfig } = useListLayer();
  const { getNodeEvents } = useNodeEvents();

  return (
    <Layer>
      {nodes.map(node => (
        <Node
          key={node.id}
          {...node}
          {...getNodeProps(node.id, trRef)}
          {...getNodeEvents(node)}
          config={{ ...node.config, draggable: true }}
        />
      ))}

      <Transformer ref={trRef} {...getTransformerConfig(trRef)} />
    </Layer>
  );
}

export default ListLayerWithTransformableNodes;
