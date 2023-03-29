import React from 'react';
import { Size } from '../../../../types/editor';
import Stage from '../../../common/editor/Stage/Stage';
import useListStage from './useListStage';

type Props = {
  size: Size;
  children: React.ReactNode;
};

function ListStage({ size, children }: Props) {
  const { getDeselectProps, getExportProps } = useListStage();

  return (
    <Stage
      width={size.width}
      height={size.height}
      style={{ background: 'white' }}
      {...getDeselectProps()}
      {...getExportProps()}
    >
      {children}
    </Stage>
  );
}

export default ListStage;
