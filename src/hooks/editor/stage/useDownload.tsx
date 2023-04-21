import JSZip from 'jszip';
import { saveAs } from 'file-saver';

function useDownload() {
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

export default useDownload;
