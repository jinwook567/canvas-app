import React from 'react';
import * as Konva from 'react-konva';
import { KonvaStage } from '../../../types/editor';
import Node from '../Node/Node';
import StageController from '../StageController/StageController';

type Props = {
  nodes: KonvaStage;
  index: number;
};

function Stage({ nodes, index }: Props) {
  // Stage에 들어가있는 Node를 알맞게 렌더링 해주어야함.
  // type에 따라서 이미지라면 이미지 컴포넌트, 텍스트라면 텍스트 컴포넌트.

  return (
    <>
      <StageController index={index} />
      <Konva.Stage width={500} height={500}>
        <Konva.Layer>
          {nodes.map(node => (
            <Node node={node} key={node.id} />
          ))}
        </Konva.Layer>
      </Konva.Stage>
    </>
  );
}

export default Stage;
