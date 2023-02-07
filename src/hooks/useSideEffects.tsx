import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { historyState, stageListState } from '../recoil/editor';
import useEditorHistory from './useEditorHistory';

function useSideEffects() {
  const stageList = useRecoilValue(stageListState);
  const history = useRecoilValue(historyState);
  const { appendHistory } = useEditorHistory();

  useEffect(() => {
    if (stageList === history.head?.stageList) return;
    appendHistory(stageList);
  }, [stageList]);
}

export default useSideEffects;
