import { KonvaNodeEvents } from 'react-konva';
import useCreate from '../../../../hooks/editor/stage/useCreate';
import useDelete from '../../../../hooks/editor/stage/useDelete';
import useDownload from '../../../../hooks/editor/stage/useDownload';
import useSelect from '../../../../hooks/editor/stage/useSelect';
import useSelectNode from '../../../../hooks/editor/node/useSelect';
import { Size } from '../../../../types/editor';

function useListStage() {
  const { isSelected, changeSelect, getNextId, getPrevId } = useSelect();

  const getWrapperProps = (id: string) => ({
    isSelected: isSelected(id),
  });

  const { deleteStage } = useDelete();
  const getStageControlBarPropsWithoutOnAppend = (id: string) => {
    const nextId = getNextId(id);
    const prevId = getPrevId(id);

    return {
      ...(nextId && { onSelectDown: () => changeSelect(nextId) }),
      ...(prevId && { onSelectUp: () => changeSelect(prevId) }),
      onDeleteStage: () => deleteStage(id),
    };
  };

  const { createStage } = useCreate();
  const getOnAppendProp = ({
    size,
    divSize,
    id,
  }: {
    size: Size;
    divSize: Size;
    id: string;
  }) => ({
    onAppendStage: () =>
      createStage({ config: { ...size }, nodes: [] }, divSize, id),
  });

  const getStageContainerProps = (id: string) => ({
    onClick: () => changeSelect(id),
  });

  const { isExportRequested, exportURIAsPng } = useDownload();
  const getStageExportProps = () => ({
    isExportRequested,
    onExport: (dataURI: string) => exportURIAsPng(dataURI),
  });

  const { resetSelect } = useSelectNode();
  const getStageSelectProps = (): KonvaNodeEvents => ({
    onTouchStart: e => e.target === e.target.getStage() && resetSelect(),
    onMouseDown: e => e.target === e.target.getStage() && resetSelect(),
  });

  return {
    getWrapperProps,
    getStageControlBarPropsWithoutOnAppend,
    getOnAppendProp,
    getStageContainerProps,
    getStageExportProps,
    getStageSelectProps,
  };
}

export default useListStage;
