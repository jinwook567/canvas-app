import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { isExportRequestedState } from '../../../recoil/editor/atoms';
import { createUniqueId } from '../../../utils/unit';

function useDownload() {
  const [isExportRequested, setIsExportRequested] = useRecoilState(
    isExportRequestedState
  );

  const requestExport = () => {
    setIsExportRequested(true);
  };

  const exportURIAsPng = (uri: string) => {
    downloadURI(uri, `${createUniqueId()}.png`);
  };

  useEffect(() => {
    if (isExportRequested) setIsExportRequested(false);
  }, [isExportRequested]);

  return {
    requestExport,
    isExportRequested,
    exportURIAsPng,
  };
}

export function useDownload2() {
  const zip = new JSZip();

  const requestExport = async (dataUrls: string[]) => {
    if (dataUrls.length === 1) {
      saveAs(dataUrls[0], 'image.png');
      return;
    }

    dataUrls.forEach((dataUrl, index) => {
      zip.file(`${index}.png`, dataUrl.split(',')[1], { base64: true });
    });

    const result = await zip.generateAsync({ type: 'blob' });
    saveAs(result, 'images.zip');
  };

  return {
    requestExport,
  };
}

function downloadURI(uri: string, name: string) {
  const link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default useDownload;
