import React, { useEffect } from 'react';
import { Group } from 'react-konva';

type Props = {
  select: () => void;
  deselect: () => void;
  children: React.ReactNode;
};

function Selector({ select, deselect, children }: Props) {
  useEffect(() => {
    select();
    return () => {
      deselect();
    };
  }, []);

  return (
    <Group onClick={select} onTouchStart={select} onMouseDown={select}>
      {children}
    </Group>
  );
}

export default Selector;
