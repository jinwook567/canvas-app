import React from 'react';
import * as Konva from 'react-konva';
import { KonvaStage } from '../../../types/editor';
import Node from '../Node/Node';
import StageContainer from '../StageContainer/StageContainer';
import StageController from '../StageController/StageController';

type Props = {
  nodes: KonvaStage;
  index: number;
};

function Stage({ nodes, index }: Props) {
  return (
    <>
      <StageController index={index} />
      <StageContainer index={index}>
        <Konva.Stage width={500} height={500}>
          <Konva.Layer>
            {nodes.map(node => (
              <Node node={node} key={node.id} />
            ))}
          </Konva.Layer>
        </Konva.Stage>
      </StageContainer>
    </>
  );
}

export default Stage;
