import React, { useEffect, useRef } from 'react';
import Konva from 'konva';
import { useRecoilState } from 'recoil';
import useElementResize from '../../../hooks/useElementSize';
import { stageClassesState } from '../../../recoil/editor/atoms';
import { Stage as StageClass } from '../../../utils/editor/shapes';
import CanvasLayer from '../CanvasLayer/CanvasLayer';
import Transformer from '../Transformer/Transformer';
import Stage from '../Stage/Stage';
import * as Styled from './List.styles';
import StageControlBar from '../StageControlBar/StageControlBar';
import useSelect from '../../../hooks/editor/stage/useSelect';
import NodeControlBar from '../NodeControlBar/NodeControlBar';
import { getResizeScale } from '../../../utils/editor/scale';

type Props = {
  isExportRequested: boolean;
  onExport: (data: { url: string; name: string }[]) => void;
};

function List({ isExportRequested, onExport }: Props) {
  const { size, divRef } = useElementResize();
  const [stages, setStages] = useRecoilState(stageClassesState);
  const { selectStage } = useSelect();

  useEffect(() => {
    if (size.width && size.height && stages.length === 0) {
      const stageSize = { width: 500, height: 500 };
      const scale = getResizeScale(stageSize, size, 0.65);

      const stage = new StageClass({
        width: stageSize.width * scale,
        height: stageSize.height * scale,
      });

      setStages([stage]);
      selectStage(stage.id);
    }
  }, [size, stages]);

  useEffect(() => {
    setStages(stages =>
      stages.map(stage => {
        const scale = getResizeScale(stage.bounds.originSize, size, 0.65);
        return stage.setConfig({
          ...stage.config,
          width: scale * stage.bounds.width,
          height: scale * stage.bounds.height,
          scaleX: scale * stage.bounds.scaleX,
          scaleY: scale * stage.bounds.scaleY,
        });
      })
    );
  }, [size]);

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
    <Styled.Grid ref={divRef} rowGap={3}>
      <NodeControlBar />
      {stages.map((stage, index) => (
        <div key={stage.id}>
          <StageControlBar
            stage={stage}
            prevStage={stages[index - 1]}
            nextStage={stages[index + 1]}
          />
          <Stage key={stage.id} id={stage.id} config={stage.config}>
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
