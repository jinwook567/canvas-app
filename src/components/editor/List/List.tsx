/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
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

function List() {
  const { size, divRef } = useElementResize();
  const [stages, setStages] = useRecoilState(stageClassesState);
  const { selectStage } = useSelect();

  const stage = new StageClass({
    width: size.width * 0.6,
    height: size.width * 0.6,
  });

  useEffect(() => {
    if (size.width && size.height && stages.length === 0) {
      setStages([stage]);
      selectStage(stage.id);
    }
  }, [size, stages]);

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
          <Stage
            key={stage.id}
            id={stage.id}
            config={stage.config}
            setNode={node => {
              stage.node = node;
            }}
          >
            <Transformer>
              {trRef => (
                <CanvasLayer
                  shapes={stage.children}
                  setNode={node => {
                    stage.canvasNode = node;
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
