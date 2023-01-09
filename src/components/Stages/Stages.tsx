import React from 'react';
import { useRecoilValue } from 'recoil';
import { usePressedKey } from '../../hooks/useEditor';
import { stagesState } from '../../recoil/editor';
import Stage from './Stage/Stage';

function Stages() {
  const stages = useRecoilValue(stagesState);

  return (
    <div>
      {stages.map((nodes, index) => (
        <Stage key={`${stages.length + index}`} nodes={nodes} index={index} />
      ))}
    </div>
  );
}

export default Stages;
