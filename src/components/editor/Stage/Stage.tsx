import React from 'react';
import Konva from 'konva';
import { Stage as StageComponent } from 'react-konva';
import { ContainerConfig } from 'konva/lib/Container';
import StageWrapper from '../../common/editor/StageWrapper/StageWrapper';

type Props = {
  children: React.ReactNode;
  setNode: (node: Konva.Stage | null) => void;
  config: ContainerConfig;
};

function Stage({ children, config, setNode }: Props) {
  return (
    <StageWrapper isSelected={false} onSelect={() => console.log('halo')}>
      <StageComponent
        {...config}
        ref={node => setNode(node)}
        style={{ background: 'white' }}
        onTouchStart={() => ''}
        onMouseDown={() => ''}
      >
        {children}
      </StageComponent>
    </StageWrapper>
  );
}

export default Stage;
