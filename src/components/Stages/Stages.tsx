import React from 'react';
import { useRecoilValue } from 'recoil';
import { stagesState } from '../../recoil/editor';
import Layer from './Layer/Layer';
import Stage from './Stage/Stage';

function Stages() {
  const stages = useRecoilValue(stagesState);

  return (
    <div>
      {stages.map((nodes, index) => (
        <Stage key={`${stages.length + index}`} index={index}>
          <Layer nodes={nodes} />
        </Stage>
      ))}
    </div>
  );
}

export default Stages;
