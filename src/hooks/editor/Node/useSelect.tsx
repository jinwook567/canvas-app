import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedIdsState, stagesState } from '../../../recoil/editor/atoms';
import { areNodesInSameStage } from '../../../utils/editor/validate';

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

  const stages = useRecoilValue(stagesState);
  const appendSelect = (id: string) => {
    if (areNodesInSameStage(stages, [...selectedIds, id])) {
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
