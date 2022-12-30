import React from 'react';
import Konva from 'react-konva';

type Props = {
  children: React.ReactNode;
};

function Stage({ children }: Props) {
  // Stage에 들어가있는 Node를 알맞게 렌더링 해주어야함.
  // type에 따라서 이미지라면 이미지 컴포넌트, 텍스트라면 텍스트 컴포넌트.

  return <Konva.Stage>{children}</Konva.Stage>;
}

export default Stage;
