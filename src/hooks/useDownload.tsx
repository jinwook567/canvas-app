import { RefObject, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Konva from 'konva';
import { downloadURI } from '../utils/editor';
import { isTriggeredDownloadState } from '../recoil/editor';

function useDownload() {
  const [isTriggeredDownload, setIsTriggeredDownload] = useRecoilState(
    isTriggeredDownloadState
  );

  useEffect(() => {
    if (isTriggeredDownload) setIsTriggeredDownload(false);
  }, [isTriggeredDownload]);

  const handleDownload = (stageRef: RefObject<Konva.Stage>, index: number) => {
    if (stageRef.current) {
      const uri = stageRef.current.toDataURL();
      downloadURI(uri, `image_${index}.png`);
    }
  };

  const triggerDownload = () => setIsTriggeredDownload(true);

  return { isTriggeredDownload, handleDownload, triggerDownload };
}

export default useDownload;
