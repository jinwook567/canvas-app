import React from 'react';
import { useRecoilValue } from 'recoil';
import { StageSize } from '../../../../hooks/editor/Stage/useCreate';
import useElementResize from '../../../../hooks/editor/useElementSize';
import { stagesState } from '../../../../recoil/editor/atoms';
import ListStage from '../ListStage/ListStage';
import { useCreateInitialStage } from './useList';
import * as Styled from './List.styles';
import ListLayerWithTransformableNodes from '../ListLayerWithTransformableNodes/ListLayerWithTransformableNodes';

function List() {
  const { size, divRef } = useElementResize();
  const stages = useRecoilValue(stagesState);

  useCreateInitialStage(stages, size);

  return (
    <Styled.Grid ref={divRef} rowGap={3}>
      {stages.map(stage => (
        <ListStage
          key={stage.id}
          id={stage.id}
          divSize={size}
          size={new StageSize(stage).size}
        >
          <ListLayerWithTransformableNodes
            stageId={stage.id}
            nodes={stage.nodes}
          />
        </ListStage>
      ))}
    </Styled.Grid>
  );
}

// render stage list
// handle stage size
// list wrapper doesn't need i think

export default List;
