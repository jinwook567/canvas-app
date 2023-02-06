import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import {
  historyState,
  historyStepState,
  stageListState,
} from '../recoil/editor';

function useEditorHistory() {
  const [stages, setStages] = useRecoilState(stageListState);
  const [history, setHistory] = useRecoilState(historyState);
  const [historyStep, setHistoryStep] = useRecoilState(historyStepState);
  const isHistoryHandlerEffect = useRef<boolean>(false);

  console.log({ history, historyStep });

  useEffect(() => {
    if (isHistoryHandlerEffect.current) {
      isHistoryHandlerEffect.current = false;
    } else {
      setHistory([...history.slice(0, historyStep), stages]);
      setHistoryStep(historyStep + 1);
    }
  }, [stages]);

  const isInitialStep = historyStep === 1;
  const isLastStep = historyStep === history.length;

  const historyBack = () => {
    if (isInitialStep) return;
    isHistoryHandlerEffect.current = true;

    setHistoryStep(historyStep - 1);
    setStages(history[historyStep - 1 - 1]);
  };

  const historyForward = () => {
    if (isLastStep) return;
    isHistoryHandlerEffect.current = true;

    setHistoryStep(historyStep + 1);
    setStages(history[historyStep]);
  };

  return { historyBack, historyForward, history };
}

export default useEditorHistory;
