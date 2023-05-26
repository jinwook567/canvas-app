import React, { useEffect, useRef } from 'react';
import Konva from 'konva';
import { useRecoilState } from 'recoil';
import useElementSize from '../../../hooks/useElementSize';
import { stageClassesState } from '../../../recoil/editor/atoms';
import { Stage as StageClass } from '../../../utils/editor/shapes';
import CanvasLayer from '../CanvasLayer/CanvasLayer';
import Transformer from '../Transformer/Transformer';
import Stage from '../Stage/Stage';
import * as Styled from './List.styles';
import StageControlBar from '../StageControlBar/StageControlBar';
import useSelect from '../../../hooks/editor/stage/useSelect';
import NodeControlBar from '../NodeControlBar/NodeControlBar';

type Props = {
  isExportRequested: boolean;
  onExport: (data: { url: string; name: string }[]) => void;
};

function List({ isExportRequested, onExport }: Props) {
  const { size, ref } = useElementSize<HTMLDivElement>();
  const [stages, setStages] = useRecoilState(stageClassesState);
  const { selectStage } = useSelect();

  useEffect(() => {
    const stage = new StageClass({
      width: 500,
      height: 500,
    });

    setStages([stage]);
    selectStage(stage.id);
  }, []);

  const canvasRef = useRef<Map<string, Konva.Layer | null> | undefined>();

  function getMap() {
    if (!canvasRef.current) {
      canvasRef.current = new Map();
    }
    return canvasRef.current;
  }

  useEffect(() => {
    if (isExportRequested && canvasRef.current) {
      const arr: { name: string; url: string }[] = [];
      canvasRef.current.forEach((value, key) => {
        if (value) arr.push({ name: key, url: value.toDataURL() });
      });
      onExport(arr);
    }
  }, [isExportRequested]);

  return (
    <Styled.Grid ref={ref} rowGap={3}>
      <NodeControlBar />
      {stages.map((stage, index) => (
        <div key={stage.id}>
          <StageControlBar
            stage={stage}
            prevStage={stages[index - 1]}
            nextStage={stages[index + 1]}
          />

          <Stage
            key={stage.id}
            id={stage.id}
            config={stage.config}
            size={stage.bounds.size}
            parentSize={size}
            parentRatio={0.65}
          >
            <Transformer>
              {trRef => (
                <CanvasLayer
                  shapes={stage.children}
                  setNode={node => {
                    const map = getMap();
                    if (node) {
                      map.set(stage.id, node);
                    } else {
                      map.delete(stage.id);
                    }
                  }}
                  trRef={trRef}
                />
              )}
            </Transformer>
          </Stage>
        </div>
      ))}
    </Styled.Grid>
  );
}

export default List;
