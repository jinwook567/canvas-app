import React from 'react';
import StageWrapper from '../../../components/editor/StageWrapper/StageWrapper';
import { Stage as StageType } from '../../../utils/editor/node';
import useSelect from '../../../hooks/editor/stage/useSelect';
import useSelectNode from '../../../hooks/editor/node/useSelect';
import ResponsiveStage from '../../../components/editor/ResponsiveStage/ResponsiveStage';
import { Size } from '../../../utils/editor/size';

type Props = {
  stage: StageType;
  children: React.ReactNode;
  parentSize: Size;
  parentRatio: number;
};

function Stage({ stage, children, parentSize, parentRatio }: Props) {
  const { isSelected } = useSelect();
  const { resetSelect } = useSelectNode();

  return (
    <StageWrapper isSelected={isSelected(stage)}>
      <ResponsiveStage
        id={stage.id}
        size={stage.bounds.size}
        parentSize={parentSize}
        parentRatio={parentRatio}
        style={{ background: 'white' }}
        onTouchStart={e => e.target.getStage() === e.target && resetSelect()}
        onMouseDown={e => e.target.getStage() === e.target && resetSelect()}
        {...stage.config}
      >
        {children}
      </ResponsiveStage>
    </StageWrapper>
  );
}

export default Stage;
