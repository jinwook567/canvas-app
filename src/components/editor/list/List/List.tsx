import React from 'react';
import { useRecoilValue } from 'recoil';
import useElementResize from '../../../../hooks/useElementSize';
import { stagesState } from '../../../../recoil/editor/atoms';
import ListStage from '../ListStage/ListStage';
import { useCreateInitialStage } from './useList';
import * as Styled from './List.styles';
import ListLayerWithTransformableNodes from '../ListLayerWithTransformableNodes/ListLayerWithTransformableNodes';
import { createStageSize } from '../../../../utils/editor/size';
import { giveId } from '../../../../hooks/editor/stage/useCreate';
import ListStageControlBar from '../ListStageControlBar/ListStageControlBar';
import NodeControlBar from '../../NodeControlBar/NodeControlBar';

function List() {
  const { size, divRef } = useElementResize();
  const stages = useRecoilValue(stagesState);

  const initialStage = { config: { width: 500, height: 500 }, nodes: [] };
  useCreateInitialStage(stages.length, giveId(initialStage), size);

  return (
    <Styled.Grid ref={divRef} rowGap={3}>
      <NodeControlBar />
      {stages.map((stage, index) => (
        <div key={stage.id}>
          <ListStageControlBar
            stage={stage}
            prevStage={stages[index - 1]}
            nextStage={stages[index + 1]}
          />
          <ListStage size={createStageSize(stage).size} stage={stage}>
            <ListLayerWithTransformableNodes nodes={stage.nodes} />
          </ListStage>
        </div>
      ))}
    </Styled.Grid>
  );
}

export default List;
