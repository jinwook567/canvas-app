import { useSetRecoilState } from 'recoil';
import { stagesState } from '../../../recoil/editor/atoms';
import useSelect from './useSelect';

function useDelete() {
  const { validateId } = useSelect();
  const setStages = useSetRecoilState(stagesState);

  const deleteStage = (id: string) => {
    if (validateId(id)) {
      setStages(currentVal =>
        currentVal.length > 1
          ? currentVal.filter(stage => stage.id !== id)
          : currentVal
      );
    }
  };

  return { deleteStage };
}

export default useDelete;
