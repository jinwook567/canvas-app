import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export function saveBase64(
  data: { base64: string; name: string; format: 'png' | 'jpg' }[]
) {
  if (data.length === 0) return;

  if (data.length === 1) {
    saveAs(data[0].base64, `${data[0].name}.${data[0].format}`);
    return;
  }

  const zip = new JSZip();
  data.forEach(({ base64: url, name }) => {
    zip.file(`${name}.png`, url.split(',')[1], { base64: true });
  });

  zip
    .generateAsync({ type: 'blob' })
    .then(result => saveAs(result, 'images.zip'));
}
