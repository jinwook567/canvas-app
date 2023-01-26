import { useState, RefObject, useEffect } from 'react';
import Konva from 'konva';
import { downloadURI } from '../../../utils/editor';

function useDownload() {
  const [isTriggeredDownload, setIsTriggeredDownload] = useState(false);

  useEffect(() => {
    if (isTriggeredDownload) setIsTriggeredDownload(false);
  }, [isTriggeredDownload]);

  const handleDownload = (stageRef: RefObject<Konva.Stage>, index: number) => {
    const uri = stageRef.current?.toDataURL();
    downloadURI(uri, `image_${index}.png`);
  };

  const triggerDownload = () => setIsTriggeredDownload(true);

  return { isTriggeredDownload, handleDownload, triggerDownload };
}

export default useDownload;
