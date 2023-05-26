import React, { useEffect } from 'react';
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
  setRef: (id: string, node: Konva.Layer | null) => void;
};

function List({ setRef }: Props) {
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
                  setNode={node => setRef(stage.id, node)}
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
