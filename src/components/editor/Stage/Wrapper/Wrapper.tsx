/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef, useEffect } from 'react';
import * as Styled from './Wrapper.styles';

type Props = {
  isSelected: boolean;
  onSelect: () => void;
  children: React.ReactNode;
};

function Wrapper({ isSelected, onSelect, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSelected && ref.current) ref.current.focus();
  }, [isSelected]);

  const handleSelect = () => {
    onSelect();
  };

  return (
    <Styled.Div onClick={handleSelect} isSelected={isSelected}>
      {children}
    </Styled.Div>
  );
}

export default Wrapper;
