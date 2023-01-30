/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useRecoilValue } from 'recoil';
import { stageListState } from '../../../recoil/editor';
import StageController from '../../Controller/StageController/StageController';
import Layer from '../Layer/Layer';
import Node from '../Node/Node';
import Stage from '../Stage/Stage';
import StageWrapper from '../StageWrapper/StageWrapper';
import useDownload from '../../../hooks/useDownload';

function StageList() {
  const stageList = useRecoilValue(stageListState);
  const { handleDownload } = useDownload();

  return (
    <>
      {stageList.map((nodes, index) => (
        <StageWrapper index={index} key={index}>
          <StageController index={index} />
          <Stage onDownload={stageRef => handleDownload(stageRef, index)}>
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
      ))}
    </>
  );
}

export default StageList;
