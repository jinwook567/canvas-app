import { useRecoilState } from 'recoil';
import { selectedStageState } from '../../../recoil/editor/atoms';
import { Stage } from '../../../types/editor';
import { isSameStage } from '../../../utils/editor/validate';

function useSelect() {
  const [selectedStage, setSelectedStage] = useRecoilState(selectedStageState);

  const isSelected = (stage: Stage) =>
    !!(selectedStage && isSameStage(stage, selectedStage));

  const selectStage = (stage: Stage) => {
    setSelectedStage(stage);
  };

  return {
    selectStage,
    isSelected,
  };
}

export default useSelect;
