import React, { useEffect } from 'react';
import { Group } from 'react-konva';

type Props = {
  onSelect: () => void;
  onDeselect: () => void;
  children: React.ReactNode;
};

function Selector({ onSelect, onDeselect, children }: Props) {
  useEffect(() => {
    onSelect();
    return () => {
      onDeselect();
    };
  }, []);

  return (
    <Group onClick={onSelect} onTouchStart={onSelect} onMouseDown={onSelect}>
      {children}
    </Group>
  );
}

export default Selector;
