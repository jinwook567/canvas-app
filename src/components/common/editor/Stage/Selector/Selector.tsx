/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

type Props = {
  children: React.ReactNode;
  onSelect: () => void;
};

function Selector({ children, onSelect }: Props) {
  return <div onClick={onSelect}>{children}</div>;
}

export default Selector;
