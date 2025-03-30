import { useRecoilState } from 'recoil';
import { selectedStageState } from 'old/recoils/editor/atoms';
import { Stage } from 'old/utils/editor/node';
import S from 'old/utils/editor/stages';

function useSelect() {
  const [selectedStage, setSelectedStage] = useRecoilState(selectedStageState);

  const isSelected = (stage: Stage) =>
    selectedStage ? S.equals(stage, selectedStage) : false;

  const selectStage = (stage: Stage | null) => {
    setSelectedStage(stage);
  };

  const deSelectStage = () => {
    setSelectedStage(null);
  };

  return {
    selectStage,
    isSelected,
    deSelectStage,
    selectedStage,
  };
}

export default useSelect;
