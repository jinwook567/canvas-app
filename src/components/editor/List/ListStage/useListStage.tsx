import useCreate from '../../../../hooks/editor/Stage/useCreate';
import useDelete from '../../../../hooks/editor/Stage/useDelete';
import useSelect from '../../../../hooks/editor/Stage/useSelect';
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

  return {
    getWrapperProps,
    getStageControlBarPropsWithoutOnAppend,
    getOnAppendProp,
    getStageContainerProps,
  };
}

export default useListStage;