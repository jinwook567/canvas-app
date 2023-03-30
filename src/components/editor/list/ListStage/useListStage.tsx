import { KonvaEventObject } from 'konva/lib/Node';
import useDownload from '../../../../hooks/editor/stage/useDownload';
import useSelectNode from '../../../../hooks/editor/node/useSelect';
import useSelect from '../../../../hooks/editor/stage/useSelect';

function useListStage() {
  const { isExportRequested, exportURIAsPng } = useDownload();

  const getExportProps = () => ({
    isExportRequested,
    onExport: (dataURI: string) => exportURIAsPng(dataURI),
  });

  const { resetSelect } = useSelectNode();

  const handleDeselect = (
    e: KonvaEventObject<TouchEvent> | KonvaEventObject<MouseEvent>
  ) => e.target === e.target.getStage() && resetSelect();

  const getDeselectProps = () => ({
    onTouchStart: handleDeselect,
    onMouseDown: handleDeselect,
  });

  const { isSelected, selectStage } = useSelect();

  return {
    getExportProps,
    getDeselectProps,
    isSelected,
    selectStage,
  };
}

export default useListStage;
