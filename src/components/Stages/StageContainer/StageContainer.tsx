import React, { useEffect, useRef } from 'react';
import useCommand from '../../../hooks/useCommand';
import useStage from '../../../hooks/useStage';
import * as Styled from './StageContaniner.styles';

type Props = {
  children: React.ReactNode;
  index: number;
};

function StageContainer({ children, index }: Props) {
  const { selectStage, currentStageIndex } = useStage();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelectStage = () => {
    selectStage(index);
  };

  useEffect(() => {
    if (index === currentStageIndex) {
      containerRef.current?.focus();
    }
  }, [currentStageIndex]);

  useCommand(containerRef);

  return (
    <Styled.Container
      onClick={handleSelectStage}
      checked={currentStageIndex === index}
      tabIndex={0}
      ref={containerRef}
    >
      {children}
    </Styled.Container>
  );
}

export default StageContainer;
