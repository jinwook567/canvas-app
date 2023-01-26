import Konva from 'konva';
import React, { MutableRefObject, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Stage as ReactKonvaStage } from 'react-konva';
import { useRecoilValue } from 'recoil';
import useSelect from '../../../hooks/useSelect';
import { stageSizeState } from '../../../recoil/editor';

type Props = {
  children: React.ReactNode;
  listRef: MutableRefObject<Map<string, Konva.Stage>>;
  id: string;
};

function Stage({ children, listRef, id }: Props) {
  const { width, height } = useRecoilValue(stageSizeState);
  const { deselect } = useSelect();

  useEffect(
    () => () => {
      listRef.current.delete(id);
    },
    [id]
  );
  // id가 변경됨에 따라서,

  return (
    <ReactKonvaStage
      width={width}
      height={height}
      onTouchStart={e => e.target === e.target.getStage() && deselect()}
      onMouseDown={e => e.target === e.target.getStage() && deselect()}
      ref={instance => {
        if (instance) listRef.current.set(id, instance);
      }}
      id={id}
    >
      {children}
    </ReactKonvaStage>
  );
}

export default Stage;
