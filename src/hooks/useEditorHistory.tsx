import { useEffect, useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { historyState, stageListState } from '../recoil/editor';
import { KonvaStageList } from '../types/editor';

function useEditorHistory() {
  const [history, setHistory] = useRecoilState(historyState);
  const setStageList = useSetRecoilState(stageListState);
  const isTriggered = useRef(false);

  const appendHistory = (stageList: KonvaStageList) => {
    setHistory({
      ...history,
      head: { stageList, prev: history.head, next: null },
    });
  };

  useEffect(() => {
    if (isTriggered.current && history.head) {
      setStageList(history.head.stageList);
      isTriggered.current = false;
    }
  }, [history]);

  const historyBack = () => {
    if (history.head && history.head.prev) {
      setHistory({
        head: {
          stageList: history.head.prev.stageList,
          prev: history.head.prev.prev,
          next: history.head,
        },
      });
      isTriggered.current = true;
    }
  };

  const historyForward = () => {
    if (history.head && history.head.next) {
      setHistory({
        head: {
          stageList: history.head.next.stageList,
          prev: history.head,
          next: history.head.next.next,
        },
      });
      isTriggered.current = true;
    }
  };

  return { historyBack, historyForward, history, appendHistory };
}

export default useEditorHistory;
