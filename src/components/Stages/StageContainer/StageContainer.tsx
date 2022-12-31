import React from 'react';
import useEditor from '../../../hooks/useEditor';
import * as Styled from './StageContaniner.styles';

type Props = {
  children: React.ReactNode;
  index: number;
};

function StageContainer({ children, index }: Props) {
  const { selectStage, stageIndex } = useEditor();

  return (
    <Styled.Container
      onClick={() => selectStage(index)}
      checked={stageIndex === index}
    >
      {children}
    </Styled.Container>
  );
}

export default StageContainer;
