import { useEffect, useRef, useState } from 'react';

function useElementResize() {
  const divRef = useRef<HTMLDivElement>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const [size, setSize] = useState({ width: 0, height: 0 });

  function handleResize() {
    if (timer.current) clearTimeout(timer.current);

    const newTimer = setTimeout(() => {
      if (divRef.current) {
        setSize({
          width: divRef.current.offsetWidth,
          height: divRef.current.offsetHeight,
        });
      }
    }, 100);

    timer.current = newTimer;
  }

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { size, divRef };
}

export default useElementResize;
