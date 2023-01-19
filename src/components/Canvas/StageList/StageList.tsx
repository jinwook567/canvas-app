import React from 'react';
import { useRecoilValue } from 'recoil';
import { stageListState } from '../../../recoil/editor';
import StageController from '../../Controller/StageController/StageController';
import useStageSize from '../../useStageSize';
import Layer from '../Layer/Layer';
import Node from '../Node/Node';
import Stage from '../Stage/Stage';
import StageWrapper from '../StageWrapper/StageWrapper';

function StageList() {
  const stageList = useRecoilValue(stageListState);
  const canvasDivRef = useStageSize();

  return (
    <div ref={canvasDivRef}>
      {stageList.map((nodes, index) => (
        <React.Fragment key={`${index + 1}`}>
          <StageController index={index} />
          <StageWrapper index={index}>
            <Stage>
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
        </React.Fragment>
      ))}
    </div>
  );
}

export default StageList;
