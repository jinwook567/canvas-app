import React from 'react';
import Konva from 'konva';
import { ContainerConfig } from 'konva/lib/Container';
import StageWrapper from '../../../components/editor/StageWrapper/StageWrapper';
import useSelect from '../../../hooks/editor/stage/useSelect';
import useSelectNode from '../../../hooks/editor/node/useSelect';
import ResponsiveStage from '../../../components/editor/ResponsiveStage/ResponsiveStage';
import { Size } from '../../../utils/editor/size';

type Props = {
  id: string;
  children: React.ReactNode;
  setNode?: (node: Konva.Stage | null) => void;
  config: ContainerConfig;
  size: Size;
  parentSize: Size;
  parentRatio: number;
};

function Stage({
  children,
  config,
  setNode,
  id,
  size,
  parentSize,
  parentRatio,
}: Props) {
  const { selectStage, isSelected } = useSelect();
  const { resetSelect } = useSelectNode();

  return (
    <StageWrapper isSelected={isSelected(id)} onSelect={() => selectStage(id)}>
      <ResponsiveStage
        size={size}
        parentSize={parentSize}
        parentRatio={parentRatio}
        id={id}
        style={{ background: 'white' }}
        onTouchStart={e => e.target.getStage() === e.target && resetSelect()}
        onMouseDown={e => e.target.getStage() === e.target && resetSelect()}
        setRef={setNode}
        {...config}
      >
        {children}
      </ResponsiveStage>
    </StageWrapper>
  );
}

export default Stage;
