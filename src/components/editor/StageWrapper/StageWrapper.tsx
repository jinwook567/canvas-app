import React, { useRef, useEffect } from 'react';
import * as Styled from './StageWrapper.styles';

type Props = {
  isSelected: boolean;
  onSelect: () => void;
  children: React.ReactNode;
};

function StageWrapper({ isSelected, children, onSelect }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSelected && ref.current) {
      ref.current?.focus();
      ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }, [isSelected]);

  return (
    <Styled.Div isSelected={isSelected} ref={ref} onClick={() => onSelect()}>
      {children}
    </Styled.Div>
  );
}

export default StageWrapper;
