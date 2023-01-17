import React from 'react';
import { useRecoilValue } from 'recoil';
import useEditorHistory from '../../hooks/useEditorHistory';
import { stagesState } from '../../recoil/editor';
import Layer from './Layer/Layer';
import Stage from './Stage/Stage';

function Stages() {
  const stages = useRecoilValue(stagesState);
  const { historyBack, historyForward } = useEditorHistory();

  return (
    <div>
      <button type="button" onClick={historyBack}>
        back
      </button>
      <button type="button" onClick={historyForward}>
        forward
      </button>
      {stages.map((nodes, index) => (
        <Stage key={`${stages.length + index}`} index={index}>
          <Layer nodes={nodes} />
        </Stage>
      ))}
    </div>
  );
}

export default Stages;
