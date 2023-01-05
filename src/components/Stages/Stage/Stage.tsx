import React, { MutableRefObject } from 'react';
import * as Konva from 'react-konva';
import { useRecoilValue } from 'recoil';
import { stageSizeState } from '../../../recoil/editor';
import { IsPressedKey, KonvaStage } from '../../../types/editor';
import Node from '../Node/Node';
import StageContainer from '../StageContainer/StageContainer';
import StageController from '../StageController/StageController';

type Props = {
  nodes: KonvaStage;
  index: number;
  isPressedKeyRef: MutableRefObject<IsPressedKey>;
};

function Stage({ nodes, index, isPressedKeyRef }: Props) {
  const { width, height } = useRecoilValue(stageSizeState);
  return (
    <>
      <StageController index={index} />
      <StageContainer index={index}>
        <Konva.Stage width={width} height={height}>
          <Konva.Layer>
            {nodes.map(node => (
              <Node
                node={node}
                key={node.id}
                isPressedKeyRef={isPressedKeyRef}
              />
            ))}
          </Konva.Layer>
        </Konva.Stage>
      </StageContainer>
    </>
  );
}

export default Stage;
