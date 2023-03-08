import { useRef, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { historyState, stagesState } from '../../../recoil/editor/atoms';
import { Stage } from '../../../types/editor';

function useHistory() {
  const [history, setHistory] = useRecoilState(historyState);
  const setStages = useSetRecoilState(stagesState);
  const isHistoryFunctionTriggered = useRef(false);

  const createHistory = (stages: Stage[]) => {
    setHistory(currentVal =>
      currentVal?.stages === stages
        ? currentVal
        : { stages, prev: currentVal, next: null }
    );
  };

  useEffect(() => {
    if (isHistoryFunctionTriggered.current && history) {
      setStages(history.stages);
      isHistoryFunctionTriggered.current = false;
    }
  }, [history]);

  const historyBack = () => {
    setHistory(currentVal =>
      currentVal && currentVal.prev
        ? {
            stages: currentVal.prev.stages,
            prev: currentVal.prev.prev,
            next: currentVal,
          }
        : currentVal
    );
    isHistoryFunctionTriggered.current = true;
  };

  const historyForward = () => {
    setHistory(currentVal =>
      currentVal && currentVal.next
        ? {
            stages: currentVal.next.stages,
            prev: currentVal,
            next: currentVal.next.next,
          }
        : currentVal
    );
    isHistoryFunctionTriggered.current = true;
  };

  return {
    createHistory,
    historyBack,
    historyForward,
  };
}

export default useHistory;
