import { useRecoilState } from 'recoil';
import { selectedStageIdState } from '../../../recoil/editor/atoms';

function useSelect() {
  const [selectedStageId, setSelectedStageId] =
    useRecoilState(selectedStageIdState);

  const isSelected = (stageId: string) => selectedStageId === stageId;

  const selectStage = (stageId: string) => {
    setSelectedStageId(stageId);
  };

  return {
    selectStage,
    isSelected,
  };
}

export default useSelect;
