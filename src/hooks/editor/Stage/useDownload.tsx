import { useRecoilState } from 'recoil';
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

  return {
    requestExport,
    isExportRequested,
    exportURIAsPng,
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
