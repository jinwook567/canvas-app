/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef, useEffect } from 'react';
import * as Styled from './Wrapper.styles';

type Props = {
  onSelect: () => void;
  isSelected: boolean;
  children: React.ReactNode;
};

function Wrapper({ isSelected, onSelect, children }: Props) {
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
    <Styled.Div isSelected={isSelected} ref={ref} onClick={onSelect}>
      {children}
    </Styled.Div>
  );
}

export default Wrapper;
