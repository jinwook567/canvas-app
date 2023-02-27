import { useRecoilState } from 'recoil';
import { selectedStageIdState } from '../../../recoil/editor/atoms';

function useSelect() {
  const [selectedStageId, setSelectedStageId] =
    useRecoilState(selectedStageIdState);

  const isSelected = (id: string) => id === selectedStageId;

  const changeSelect = (id: string) => {
    setSelectedStageId(id);
  };

  return {
    isSelected,
    changeSelect,
  };
}

export default useSelect;
