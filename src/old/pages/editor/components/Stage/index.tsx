import React from 'react';
import StageWrapper from 'old/components/editor/StageWrapper';
import { Stage as StageType } from 'old/utils/editor/node';
import useSelect from 'old/hooks/editor/stage/useSelect';
import useSelectNode from 'old/hooks/editor/node/useSelect';
import ResponsiveStage from 'old/components/editor/ResponsiveStage';
import { Size } from 'old/utils/editor/size';

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
