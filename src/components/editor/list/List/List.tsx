import React from 'react';
import { useRecoilValue } from 'recoil';
import useElementResize from '../../../../hooks/useElementSize';
import { stagesState } from '../../../../recoil/editor/atoms';
import ListStage from '../ListStage/ListStage';
import useList, { useCreateInitialStage } from './useList';
import * as Styled from './List.styles';
import ListLayerWithTransformableNodes from '../ListLayerWithTransformableNodes/ListLayerWithTransformableNodes';
import { createStageSize } from '../../../../utils/editor/size';
import NodeControlBar from '../../NodeControlBar/NodeControlBar';
import Stage from '../../../common/editor/Stage/Stage';

function List() {
  const { size, divRef } = useElementResize();
  const stages = useRecoilValue(stagesState);

  useCreateInitialStage(stages, size);
  const { getStageWrapperProps } = useList();

  return (
    <Styled.Grid ref={divRef} rowGap={3}>
      <NodeControlBar />

      {stages.map(stage => (
        <Stage.Wrapper key={stage.id} {...getStageWrapperProps(stage)}>
          <ListStage size={createStageSize(stage).size}>
            <ListLayerWithTransformableNodes nodes={stage.nodes} />
          </ListStage>
        </Stage.Wrapper>
      ))}
    </Styled.Grid>
  );
}

export default List;
