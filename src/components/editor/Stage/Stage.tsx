import React from 'react';
import Konva from 'konva';
import { Stage as StageComponent } from 'react-konva';
import { ContainerConfig } from 'konva/lib/Container';
import StageWrapper from '../../common/editor/StageWrapper/StageWrapper';
import useSelect from '../../../hooks/editor/stage/useSelect';
import useSelectNode from '../../../hooks/editor/node/useSelect';

type Props = {
  id: string;
  children: React.ReactNode;
  setNode: (node: Konva.Stage | null) => void;
  config: ContainerConfig;
};

function Stage({ children, config, setNode, id }: Props) {
  const { selectStage, isSelected } = useSelect();
  const { resetSelect } = useSelectNode();

  return (
    <StageWrapper isSelected={isSelected(id)} onSelect={() => selectStage(id)}>
      <StageComponent
        {...config}
        id={id}
        ref={node => setNode(node)}
        style={{ background: 'white' }}
        onTouchStart={e => e.target.getStage() === e.target && resetSelect()}
        onMouseDown={e => e.target.getStage() === e.target && resetSelect()}
      >
        {children}
      </StageComponent>
    </StageWrapper>
  );
}

export default Stage;
