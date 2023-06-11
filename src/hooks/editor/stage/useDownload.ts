import JSZip from 'jszip';
import { saveAs } from 'file-saver';

function useDownload() {
  const zip = new JSZip();

  const requestExport = async (data: { url: string; name: string }[]) => {
    if (data.length === 0) return;
    if (data.length === 1) {
      saveAs(data[0].url, `${data[0].name}.png`);
      return;
    }

    data.forEach(({ url, name }) => {
      zip.file(`${name}.png`, url.split(',')[1], { base64: true });
    });

    const result = await zip.generateAsync({ type: 'blob' });
    saveAs(result, 'images.zip');
  };

  return {
    requestExport,
  };
}

export default useDownload;
