import React from 'react';
import { useRecoilValue } from 'recoil';
import useAsset from '../../../hooks/useAsset';
import useEditorHistory from '../../../hooks/useEditorHistory';
import { stageList } from '../../../recoil/editor';
import StageController from '../../Controller/StageController/StageController';
import useStageSize from '../../useStageSize';
import Layer from '../Layer/Layer';
import Stage from '../Stage/Stage';

function Stages() {
  const stages = useRecoilValue(stageList);
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
  const canvasDivRef = useStageSize();

  return (
    <div ref={canvasDivRef}>
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
        <>
          <StageController index={index} />
          <Stage key={`${stages.length + index}`} index={index}>
            <Layer nodes={nodes} />
          </Stage>
        </>
      ))}
    </div>
  );
}

export default Stages;
