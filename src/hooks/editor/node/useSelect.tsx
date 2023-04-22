import { useRecoilState } from 'recoil';
import { selectedIdsState } from '../../../recoil/editor/atoms';

function useSelect() {
  const [selectedIds, setSelectedIds] = useRecoilState(selectedIdsState);

  const isSelected = (id: string) => selectedIds.includes(id);

  const resetSelect = () => {
    setSelectedIds([]);
  };

  const deselect = (id: string) => {
    setSelectedIds(currentVal =>
      currentVal.filter(selectedId => selectedId !== id)
    );
  };

  const appendSelect = (id: string) => {
    setSelectedIds(currentVal => [...new Set([...currentVal, id])]);
  };

  const changeSelect = (id: string) => {
    setSelectedIds([id]);
  };

  const replaceSelect = (ids: string[]) => {
    setSelectedIds(ids);
  };

  return {
    isSelected,
    resetSelect,
    deselect,
    appendSelect,
    changeSelect,
    replaceSelect,
  };
}

export default useSelect;
