import React from 'react';
import useSelect from '../../../../hooks/editor/stage/useSelect';
import { Size, Stage as StageType } from '../../../../types/editor';
import Stage from '../../../common/editor/Stage/Stage';
import useListStage from './useListStage';

type Props = {
  size: Size;
  children: React.ReactNode;
  stage: StageType;
};

function ListStage({ size, children, stage }: Props) {
  const { getDeselectProps, getExportProps } = useListStage();
  const { isSelected, selectStage } = useSelect();

  return (
    <Stage.Wrapper
      isSelected={isSelected(stage.id)}
      onSelect={() => selectStage(stage.id)}
    >
      <Stage
        width={size.width}
        height={size.height}
        style={{ background: 'white' }}
        {...getDeselectProps()}
        {...getExportProps()}
      >
        {children}
      </Stage>
    </Stage.Wrapper>
  );
}

export default ListStage;
