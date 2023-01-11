import React from 'react';
import useStage from '../../../hooks/useStage';
import * as Styled from './StageContaniner.styles';

type Props = {
  children: React.ReactNode;
  index: number;
};

function StageContainer({ children, index }: Props) {
  const { selectStage, currentStageIndex } = useStage();

  return (
    <Styled.Container
      onClick={() => selectStage(index)}
      checked={currentStageIndex === index}
    >
      {children}
    </Styled.Container>
  );
}

export default StageContainer;
