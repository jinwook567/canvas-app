import Konva from 'konva';
import React, { useRef } from 'react';
import * as ReactKonva from 'react-konva';
import { useRecoilValue } from 'recoil';
import { selectedIdsState } from '../../../recoil/editor';
import { KonvaStage } from '../../../types/editor';
import Node from '../Node/Node';
import Transformer from '../Transformer/Transformer';

type Props = {
  nodes: KonvaStage;
};

function Layer({ nodes }: Props) {
  const trRef = useRef<Konva.Transformer>(null);
  const selectedIds = useRecoilValue(selectedIdsState);

  return (
    <ReactKonva.Layer>
      {nodes.map(node => (
        <Node
          key={node.id}
          node={node}
          trRef={trRef}
          isSelected={!!selectedIds.find(id => node.id === id)}
        />
      ))}

      <Transformer trRef={trRef} />
    </ReactKonva.Layer>
  );
}

export default Layer;
