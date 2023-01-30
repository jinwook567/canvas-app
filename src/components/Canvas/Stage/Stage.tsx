import Konva from 'konva';
import React, { RefObject, useEffect, useRef } from 'react';
import { Stage as ReactKonvaStage } from 'react-konva';
import { useRecoilValue } from 'recoil';
import useDownload from '../../../hooks/useDownload';
import useSelect from '../../../hooks/useSelect';
import { stageSizeState } from '../../../recoil/editor';

type Props = {
  children: React.ReactNode;
  onDownload: (ref: RefObject<Konva.Stage>) => void;
};

function Stage({ children, onDownload }: Props) {
  const { width, height } = useRecoilValue(stageSizeState);
  const { deselect } = useSelect();
  const { isTriggeredDownload } = useDownload();
  const stageRef = useRef<Konva.Stage>(null);

  useEffect(() => {
    if (isTriggeredDownload) onDownload(stageRef);
  }, [isTriggeredDownload]);

  return (
    <ReactKonvaStage
      width={width}
      height={height}
      onTouchStart={e => e.target === e.target.getStage() && deselect()}
      onMouseDown={e => e.target === e.target.getStage() && deselect()}
      ref={stageRef}
    >
      {children}
    </ReactKonvaStage>
  );
}

export default Stage;
