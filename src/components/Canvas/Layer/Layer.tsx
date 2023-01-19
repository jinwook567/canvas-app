import Konva from 'konva';
import React, { useRef, RefObject } from 'react';
import { Layer as ReactKonvaLayer } from 'react-konva';
import { useRecoilValue } from 'recoil';
import { selectedIdsState } from '../../../recoil/editor';
import { SelectedIds } from '../../../types/editor';
import Transformer from '../Transformer/Transformer';

type Props = {
  children: ({
    trRef,
    selectedIds,
  }: {
    trRef: RefObject<Konva.Transformer>;
    selectedIds: SelectedIds;
  }) => React.ReactNode;
};

function Layer({ children }: Props) {
  const trRef = useRef<Konva.Transformer>(null);
  const selectedIds = useRecoilValue(selectedIdsState);

  return (
    <ReactKonvaLayer>
      {children({ trRef, selectedIds })}

      <Transformer trRef={trRef} />
    </ReactKonvaLayer>
  );
}

export default Layer;
