import { useEffect, useRef, MutableRefObject } from 'react';

function usePressedKey() {
  const initialValue = {
    Shift: false,
  };

  const pressedKeyRef = useRef<{ [key in string]: boolean }>(initialValue);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (pressedKeyRef.current[e.key] !== undefined) {
      pressedKeyRef.current[e.key] = true;
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (pressedKeyRef.current[e.key] !== undefined) {
      pressedKeyRef.current[e.key] = false;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return pressedKeyRef as MutableRefObject<typeof initialValue>;
}

export default usePressedKey;
