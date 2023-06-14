import React from 'react';
import useElementSize from 'hooks/useElementSize';

type Props = {
  style?: React.CSSProperties;
  children: (size: { width: number; height: number }) => React.ReactNode;
  inherit?: boolean;
};

function DivSize({ style, children, inherit }: Props) {
  const { size, ref } = useElementSize<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={inherit ? { width: '100%', height: '100%', ...style } : style}
    >
      {children(size)}
    </div>
  );
}

export default DivSize;
