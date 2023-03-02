import { useRecoilState, useRecoilValue } from 'recoil';
import {
  selectedStageIdState,
  stagesState,
} from '../../../recoil/editor/atoms';

function useSelect() {
  const [selectedStageId, setSelectedStageId] =
    useRecoilState(selectedStageIdState);

  const stages = useRecoilValue(stagesState);

  const isSelected = (id: string) => id === selectedStageId;

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
    isSelected,
    changeSelect,
    getNextId,
    getPrevId,
    validateId,
  };
}

export default useSelect;
