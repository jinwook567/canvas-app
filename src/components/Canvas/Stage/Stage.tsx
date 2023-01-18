import React from 'react';
import { Stage as ReactKonvaStage } from 'react-konva';
import { useRecoilValue } from 'recoil';
import useSelect from '../../../hooks/useSelect';
import { stageSizeState } from '../../../recoil/editor';
import StageContainer from '../StageContainer/StageContainer';

type Props = {
  index: number;
  children: React.ReactNode;
};

function Stage({ index, children }: Props) {
  const { width, height } = useRecoilValue(stageSizeState);
  const { deselect } = useSelect();

  return (
    <StageContainer index={index}>
      <ReactKonvaStage
        width={width}
        height={height}
        onTouchStart={e => e.target === e.target.getStage() && deselect()}
        onMouseDown={e => e.target === e.target.getStage() && deselect()}
      >
        {children}
      </ReactKonvaStage>
    </StageContainer>
  );
}

export default Stage;
