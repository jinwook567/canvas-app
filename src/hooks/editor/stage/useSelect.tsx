import { useRecoilState } from 'recoil';
import { selectedStageState } from '../../../recoil/editor/atoms';
import { Stage } from '../../../utils/editor/node';
import S from '../../../utils/editor/stages';

function useSelect() {
  const [selectedStage, setSelectedStage] = useRecoilState(selectedStageState);

  const isSelected = (stage: Stage) =>
    selectedStage && S.equals(stage, selectedStage);

  const selectStage = (stage: Stage) => {
    setSelectedStage(stage);
  };

  const deSelectStage = () => {
    setSelectedStage(null);
  };

  return {
    selectStage,
    isSelected,
    deSelectStage,
  };
}

export default useSelect;
