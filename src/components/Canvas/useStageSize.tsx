import { useRef, useEffect } from 'react';

type Props = {
  setStageSize: (size: { width: number; height: number }) => void;
};

function useStageSize({ setStageSize }: Props) {
  const canvasDivRef = useRef<HTMLDivElement>(null);
  const time = 100;

  const timer = useRef<NodeJS.Timeout | null>(null);

  const getSize = () =>
    canvasDivRef.current
      ? {
          width: canvasDivRef.current.offsetWidth,
          height: canvasDivRef.current.offsetWidth,
        }
      : null;

  const handleResize = () => {
    if (timer.current) clearTimeout(timer.current);
    const newTimer = setTimeout(() => {
      const size = getSize();
      if (size) setStageSize(size);
    }, time);
    timer.current = newTimer;
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return canvasDivRef;
}

export default useStageSize;
