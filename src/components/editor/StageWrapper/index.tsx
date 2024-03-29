import React, { useRef, useEffect } from 'react';
import * as Styled from 'components/editor/StageWrapper/styles';

type Props = {
  isSelected: boolean;
  children: React.ReactNode;
};

function StageWrapper({ isSelected, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSelected && ref.current) {
      ref.current.focus();
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }, [isSelected]);

  return (
    <Styled.Div isSelected={isSelected} ref={ref}>
      {children}
    </Styled.Div>
  );
}

export default StageWrapper;
