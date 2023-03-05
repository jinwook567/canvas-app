import { useRecoilValue, useSetRecoilState } from 'recoil';
import { stagesState } from '../../../recoil/editor/atoms';
import { stagesCountState } from '../../../recoil/editor/selectors';
import useSelect from './useSelect';

function useDelete() {
  const { validateId, changeSelect, getPrevId, getNextId } = useSelect();
  const setStages = useSetRecoilState(stagesState);
  const stagesCount = useRecoilValue(stagesCountState);

  const deleteStage = (id: string) => {
    if (!validateId(id) || stagesCount <= 1) return;

    setStages(currentVal => currentVal.filter(stage => stage.id !== id));

    const prevId = getPrevId(id);
    const nextId = getNextId(id);

    if (prevId) {
      changeSelect(prevId);
      return;
    }

    if (nextId) {
      changeSelect(nextId);
      return;
    }

    if (!prevId && !nextId) throw new Error('there is no possible case');
  };

  return { deleteStage };
}

export default useDelete;
