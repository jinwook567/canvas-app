import React from 'react';
import * as ReactKonva from 'react-konva';
import { useRecoilValue } from 'recoil';
import useSelect from '../../../hooks/useSelect';
import { stageSizeState } from '../../../recoil/editor';
import StageContainer from '../StageContainer/StageContainer';
import StageController from '../StageController/StageController';

type Props = {
  index: number;
  children: React.ReactNode;
};

function Stage({ index, children }: Props) {
  const { width, height } = useRecoilValue(stageSizeState);
  const { deselect } = useSelect();

  return (
    <>
      <StageController index={index} />
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
