import React from 'react';
import useElementSize from '../../../hooks/useElementSize';

type Props = {
  style?: React.CSSProperties;
  children: (size: { width: number; height: number }) => React.ReactNode;
};

function DivSize({ style, children }: Props) {
  const { size, ref } = useElementSize<HTMLDivElement>();

  return (
    <div ref={ref} style={style}>
      {children(size)}
    </div>
  );
}

export default DivSize;
