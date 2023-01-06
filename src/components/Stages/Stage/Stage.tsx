import Konva from 'konva';
import React, { MutableRefObject, useRef } from 'react';
import * as ReactKonva from 'react-konva';
import { useRecoilValue } from 'recoil';
import useEditor from '../../../hooks/useEditor';
import { stageSizeState } from '../../../recoil/editor';
import { IsPressedKey, KonvaStage } from '../../../types/editor';
import Node from '../Node/Node';
import StageContainer from '../StageContainer/StageContainer';
import StageController from '../StageController/StageController';

type Props = {
  nodes: KonvaStage;
  index: number;
  isPressedKeyRef: MutableRefObject<IsPressedKey>;
};

function Stage({ nodes, index, isPressedKeyRef }: Props) {
  const { width, height } = useRecoilValue(stageSizeState);
  const { selectedIds, deselect } = useEditor();
  const trRef = useRef<Konva.Transformer>(null);

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
          <ReactKonva.Layer>
            {nodes.map(node => (
              <Node
                key={node.id}
                node={node}
                isPressedKeyRef={isPressedKeyRef}
                trRef={trRef}
                isSelected={!!selectedIds.find(id => node.id === id)}
              />
            ))}
            {/* {selectedIds.length > 0 && <ReactKonva.Transformer ref={trRef} />} */}
            <ReactKonva.Transformer ref={trRef} />
          </ReactKonva.Layer>
        </ReactKonva.Stage>
      </StageContainer>
    </>
  );
}

export default Stage;
