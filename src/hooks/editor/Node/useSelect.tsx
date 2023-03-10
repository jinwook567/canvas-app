import { useRecoilState } from 'recoil';
import { selectedIdsState } from '../../../recoil/editor/atoms';
import useValidate from './useValidate';

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

  const { areNodesInSameStage } = useValidate();
  const appendSelect = (id: string) => {
    if (areNodesInSameStage([...selectedIds, id])) {
      setSelectedIds(currentVal => [...currentVal, id]);
    } else {
      changeSelect(id);
    }
  };

  const changeSelect = (id: string) => {
    setSelectedIds([id]);
  };

  return {
    isSelected,
    resetSelect,
    deselect,
    appendSelect,
    changeSelect,
  };
}

export default useSelect;
