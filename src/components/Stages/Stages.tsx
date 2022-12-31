import React from 'react';
import { useRecoilValue } from 'recoil';
import { stagesState } from '../../recoil/editor';
import Stage from './Stage/Stage';

function Stages() {
  const stages = useRecoilValue(stagesState);

  return (
    <div>
      {stages.map((stage, index) => (
        <Stage nodes={stage} key={`${stages.length + index}`} index={index} />
      ))}
    </div>
  );
}

export default Stages;
