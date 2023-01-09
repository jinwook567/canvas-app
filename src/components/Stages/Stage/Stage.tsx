import Konva from 'konva';
import React, { useRef } from 'react';
import * as ReactKonva from 'react-konva';
import { useRecoilValue } from 'recoil';
import useEditor from '../../../hooks/useEditor';
import { stageSizeState } from '../../../recoil/editor';
import { KonvaStage } from '../../../types/editor';
import Node from '../Node/Node';
import StageContainer from '../StageContainer/StageContainer';
import StageController from '../StageController/StageController';
import Transformer from '../Transformer/Transformer';

type Props = {
  nodes: KonvaStage;
  index: number;
};

function Stage({ nodes, index }: Props) {
  const { width, height } = useRecoilValue(stageSizeState);
  const { selectedIds, deselect } = useEditor();
  const trRef = useRef<Konva.Transformer>(null);

  return (
    <>
      <StageController index={index} />
      <StageContainer index={index}>
        <ReactKonva.Stage
          width={width}
          height={height}
          onTouchStart={e => e.target === e.target.getStage() && deselect()}
          onMouseDown={e => e.target === e.target.getStage() && deselect()}
        >
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
        </ReactKonva.Stage>
      </StageContainer>
    </>
  );
}

export default Stage;
