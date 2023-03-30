import React, { useRef, useEffect } from 'react';
import { KonvaNodeEvents, Stage as KonvaStage } from 'react-konva';
import Konva from 'konva';
import Wrapper from './Wrapper/Wrapper';
import Selector from './Selector/Selector';

type Props = {
  children: React.ReactNode;
  isExportRequested: boolean;
  onExport: (dataUrl: string) => void;
} & Konva.ContainerConfig &
  KonvaNodeEvents;

function Stage({ children, isExportRequested, onExport, ...config }: Props) {
  const ref = useRef<Konva.Stage>(null);

  useEffect(() => {
    if (isExportRequested && ref.current) onExport(ref.current.toDataURL());
  }, [isExportRequested]);

  return (
    <KonvaStage ref={ref} {...config}>
      {children}
    </KonvaStage>
  );
}

Stage.Wrapper = Wrapper;
Stage.Selector = Selector;

export default Stage;
