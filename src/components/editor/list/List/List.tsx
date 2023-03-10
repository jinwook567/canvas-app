import React from 'react';
import { useRecoilValue } from 'recoil';
import useElementResize from '../../../../hooks/editor/useElementSize';
import { stagesState } from '../../../../recoil/editor/atoms';
import ListStage from '../ListStage/ListStage';
import { useCreateInitialStage } from './useList';
import * as Styled from './List.styles';
import ListLayerWithTransformableNodes from '../ListLayerWithTransformableNodes/ListLayerWithTransformableNodes';
import { createStageSize } from '../../../../utils/editor/size';

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
          size={createStageSize(stage).size}
        >
          <ListLayerWithTransformableNodes nodes={stage.nodes} />
        </ListStage>
      ))}
    </Styled.Grid>
  );
}

// render stage list
// handle stage size
// list wrapper doesn't need i think

export default List;
