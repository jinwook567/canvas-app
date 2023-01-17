import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { historyState, historyStepState, stagesState } from '../recoil/editor';

function useEditorHistory() {
  const [stages, setStages] = useRecoilState(stagesState);
  const [history, setHistory] = useRecoilState(historyState);
  const [historyStep, setHistoryStep] = useRecoilState(historyStepState);
  const [isHistoryHandlerEffect, setIsHistoryHandlerEffect] = useState(false);

  useEffect(() => {
    if (isHistoryHandlerEffect) {
      setIsHistoryHandlerEffect(false);
    } else {
      setHistory([...history.slice(0, historyStep), stages]);
      setHistoryStep(historyStep + 1);
    }
  }, [stages]);

  const isInitialStep = historyStep === 1;
  const isLastStep = historyStep === history.length;

  const historyBack = () => {
    if (isInitialStep) return;
    setIsHistoryHandlerEffect(true);
    setHistoryStep(historyStep - 1);
    setStages(history[historyStep - 1 - 1]);
  };

  const historyForward = () => {
    if (isLastStep) return;
    setIsHistoryHandlerEffect(true);
    setHistoryStep(historyStep + 1);

    setStages(history[historyStep]);
  };

  return { historyBack, historyForward };
}

export default useEditorHistory;
