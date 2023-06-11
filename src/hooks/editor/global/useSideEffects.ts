import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { stagesState } from 'recoils/editor/atoms';
import useHistory from 'hooks/editor/global/useHistory';

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
