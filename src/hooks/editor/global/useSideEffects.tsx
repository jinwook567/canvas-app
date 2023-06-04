import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { stagesState } from '../../../recoil/editor/atoms';
import useHistory from './useHistory';

function useSideEffects() {
  useHistoryEffects();
}

function useHistoryEffects() {
  const stages = useRecoilValue(stagesState);
  const { createHistory } = useHistory();

  useEffect(() => {
    createHistory(stages);
  }, [stages]);
}

export default useSideEffects;
