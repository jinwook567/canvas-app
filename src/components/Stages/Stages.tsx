import React from 'react';
import { useRecoilValue } from 'recoil';
import useAsset from '../../hooks/useAsset';
import useEditorHistory from '../../hooks/useEditorHistory';
import { stagesState } from '../../recoil/editor';
import Layer from './Layer/Layer';
import Stage from './Stage/Stage';

function Stages() {
  const stages = useRecoilValue(stagesState);
  const { historyBack, historyForward } = useEditorHistory();
  const { appendAsset } = useAsset();
  const handleAppendText = () => {
    appendAsset({
      type: 'text',
      text: '텍스트 텍스트',
      fontSize: 30,
      fontFamily: 'Calibri',
    });
  };

  return (
    <div>
      <button type="button" onClick={historyBack}>
        back
      </button>
      <button type="button" onClick={historyForward}>
        forward
      </button>
      <button type="button" onClick={handleAppendText}>
        텍스트 추가
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
