import React, { useRef, useEffect } from 'react';
import { Stage as KonvaStage } from 'react-konva';
import Konva from 'konva';
import Wrapper from './Wrapper/Wrapper';

type Props = {
  children: React.ReactNode;
  requestExport: boolean;
  onExport: (dataUrl: string) => void;
} & Konva.ContainerConfig;

function Stage({ children, requestExport, onExport, ...config }: Props) {
  const ref = useRef<Konva.Stage>(null);

  useEffect(() => {
    if (requestExport && ref.current) onExport(ref.current.toDataURL());
  }, [requestExport]);

  return (
    <KonvaStage ref={ref} {...config}>
      {children}
    </KonvaStage>
  );
}

Stage.Wrapper = Wrapper;

export default Stage;
