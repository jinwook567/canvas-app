import React from 'react';
import Konva from 'react-konva';

type Props = {
  children: React.ReactNode;
};

function Stage({ children }: Props) {
  return <Konva.Stage>{children}</Konva.Stage>;
}

export default Stage;
