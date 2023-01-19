import { useRef, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { stageSizeState } from '../../recoil/editor';

function useStageSize() {
  const canvasDivRef = useRef<HTMLDivElement>(null);
  const setStageSize = useSetRecoilState(stageSizeState);
  const time = 500;
  const ratio = 0.3;

  const timer = useRef<NodeJS.Timeout | null>(null);

  const getSize = () =>
    canvasDivRef.current
      ? {
          width: canvasDivRef.current.offsetWidth * 0.5,
          height: canvasDivRef.current.offsetWidth * 0.5,
        }
      : null;

  const handleResize = () => {
    if (!timer.current) {
      const size = getSize();
      if (size) setStageSize(size);

      const newTimer = setTimeout(() => {
        timer.current = null;
      }, time);
      timer.current = newTimer;
    }
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
