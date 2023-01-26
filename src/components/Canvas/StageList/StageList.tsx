import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { stageListState, stageSizeState } from '../../../recoil/editor';
import StageController from '../../Controller/StageController/StageController';
import useStageSize from '../useStageSize';
import Layer from '../Layer/Layer';
import Node from '../Node/Node';
import Stage from '../Stage/Stage';
import StageWrapper from '../StageWrapper/StageWrapper';
import * as Styled from './StageList.styles';
import useDownload from './useDownload';

function StageList() {
  const stageList = useRecoilValue(stageListState);

  const setStageSize = useSetRecoilState(stageSizeState);
  const canvasDivRef = useStageSize({
    setStageSize: size =>
      setStageSize({ width: size.width / 2, height: size.height / 2 }),
  });

  const { isTriggeredDownload, handleDownload, triggerDownload } =
    useDownload();

  return (
    <Styled.Container ref={canvasDivRef}>
      <button type="button" onClick={triggerDownload}>
        Hi
      </button>
      {stageList.map((nodes, index) => (
        <Styled.StageArea key={`${index + 1}`}>
          <StageWrapper index={index}>
            <StageController index={index} />
            <Stage
              isTriggeredDownload={isTriggeredDownload}
              onDownload={stageRef => handleDownload(stageRef, index)}
            >
              <Layer>
                {({ trRef, selectedIds }) =>
                  nodes.map(node => (
                    <Node
                      key={node.id}
                      node={node}
                      trRef={trRef}
                      isSelected={!!selectedIds.find(id => node.id === id)}
                    />
                  ))
                }
              </Layer>
            </Stage>
          </StageWrapper>
        </Styled.StageArea>
      ))}
    </Styled.Container>
  );
}

export default StageList;
