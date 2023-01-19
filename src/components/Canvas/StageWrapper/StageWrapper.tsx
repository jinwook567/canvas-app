import React, { useEffect, useRef } from 'react';
import useCommand from '../../../hooks/useCommand';
import useStage from '../../../hooks/useStage';
import * as Styled from './StageWrapper.styles';

type Props = {
  children: React.ReactNode;
  index: number;
};

function StageWrapper({ children, index }: Props) {
  const { selectStage, currentStageIndex } = useStage();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleSelectStage = () => {
    selectStage(index);
  };

  useEffect(() => {
    if (index === currentStageIndex) {
      wrapperRef.current?.focus({ preventScroll: true });
      wrapperRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }, [currentStageIndex]);

  useCommand(wrapperRef);

  return (
    <Styled.Wrapper
      onClick={handleSelectStage}
      checked={currentStageIndex === index}
      tabIndex={0}
      ref={wrapperRef}
    >
      {children}
    </Styled.Wrapper>
  );
}

export default StageWrapper;
