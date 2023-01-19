import React from 'react';
import { Stage as ReactKonvaStage } from 'react-konva';
import { useRecoilValue } from 'recoil';
import useSelect from '../../../hooks/useSelect';
import { stageSizeState } from '../../../recoil/editor';

type Props = {
  children: React.ReactNode;
};

function Stage({ children }: Props) {
  const { width, height } = useRecoilValue(stageSizeState);
  const { deselect } = useSelect();

  return (
    <ReactKonvaStage
      width={width}
      height={height}
      onTouchStart={e => e.target === e.target.getStage() && deselect()}
      onMouseDown={e => e.target === e.target.getStage() && deselect()}
    >
      {children}
    </ReactKonvaStage>
  );
}

export default Stage;
