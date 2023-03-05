import React from 'react';
import { Size } from '../../../../types/editor';
import Stage from '../../Stage/Stage';
import StageControlBar from '../../StageControlBar/StageControlBar';
import useListStage from './useListStage';

type Props = {
  id: string;
  size: Size;
  divSize: Size;
  children: React.ReactNode;
};

function ListStage({ id, size, divSize, children }: Props) {
  const {
    getWrapperProps,
    getStageControlBarPropsWithoutOnAppend,
    getOnAppendProp,
    getStageContainerProps,
  } = useListStage();

  return (
    <Stage.Wrapper {...getWrapperProps(id)}>
      <StageControlBar
        {...getStageControlBarPropsWithoutOnAppend(id)}
        {...getOnAppendProp({ size, divSize, id })}
      />
      <div {...getStageContainerProps(id)}>
        <Stage
          width={size.width}
          height={size.height}
          style={{ background: 'white' }}
          requestExport={false}
          onExport={dataUrl => dataUrl}
        >
          {children}
        </Stage>
      </div>
    </Stage.Wrapper>
  );
}

export default ListStage;
