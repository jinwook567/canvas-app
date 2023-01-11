import React from 'react';
import * as ReactKonva from 'react-konva';
import { useRecoilValue } from 'recoil';
import useEditor from '../../../hooks/useEditor';
import { stageSizeState } from '../../../recoil/editor';
import StageContainer from '../StageContainer/StageContainer';
import StageController from '../StageController/StageController';

type Props = {
  index: number;
  children: React.ReactNode;
};

function Stage({ index, children }: Props) {
  const { width, height } = useRecoilValue(stageSizeState);
  const {
    deselect,
    handleOrganizeGroup,
    handleCloseGroup,
    selectedIds,
    currentStage,
  } = useEditor();
  console.log(currentStage, selectedIds);

  return (
    <>
      <StageController index={index} />
      <button type="button" onClick={() => handleOrganizeGroup(selectedIds)}>
        그룹
      </button>
      <button type="button" onClick={() => handleCloseGroup(selectedIds[0])}>
        그룹 해제
      </button>
      <StageContainer index={index}>
        <ReactKonva.Stage
          width={width}
          height={height}
          onTouchStart={e => e.target === e.target.getStage() && deselect()}
          onMouseDown={e => e.target === e.target.getStage() && deselect()}
        >
          {children}
        </ReactKonva.Stage>
      </StageContainer>
    </>
  );
}

export default Stage;
