import { useRecoilState, useRecoilValue } from 'recoil';
import {
  selectedStageIdState,
  selectedStageState,
  stagesState,
} from '../../../recoil/editor/atoms';
import { Stage } from '../../../types/editor';
import { isSameStage } from '../../../utils/editor/validate';

function useSelect() {
  const [selectedStageId, setSelectedStageId] =
    useRecoilState(selectedStageIdState);

  const [selectedStage, setSelectedStage] = useRecoilState(selectedStageState);

  const stages = useRecoilValue(stagesState);

  const isSelected = (stage: Stage) =>
    !!(selectedStage && isSameStage(stage, selectedStage));

  const selectStage = (stage: Stage) => {
    setSelectedStage(stage);
  };

  const validateId = (id: string) => {
    if (!stages.find(stage => stage.id === id))
      throw new Error('there is no stage given id');
    return true;
  };

  const changeSelect = (id: string) => {
    if (validateId(id)) {
      setSelectedStageId(id);
    }
  };

  const changeSelectWithoutValidate = (id: string) => {
    setSelectedStageId(id);
  };

  const getNextId = (id: string) => {
    if (validateId(id)) {
      return stages[stages.findIndex(stage => stage.id === id) + 1]?.id || null;
    }
    return null;
  };

  const getPrevId = (id: string) => {
    if (validateId(id)) {
      return stages[stages.findIndex(stage => stage.id === id) - 1]?.id || null;
    }
    return null;
  };

  return {
    selectStage,
    isSelected,
    changeSelect,
    changeSelectWithoutValidate,
    getNextId,
    getPrevId,
    validateId,
  };
}

export default useSelect;
