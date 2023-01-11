import { useEffect, useRef, MutableRefObject } from 'react';
import { IsPressedKey } from '../types/editor';

function usePressedKey() {
  const initialValue: IsPressedKey = {
    Shift: false,
  };

  const isPressedKeyRef = useRef<{ [key in string]: boolean }>(initialValue);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isPressedKeyRef.current[e.key] !== undefined) {
      isPressedKeyRef.current[e.key] = true;
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (isPressedKeyRef.current[e.key] !== undefined) {
      isPressedKeyRef.current[e.key] = false;
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

  return isPressedKeyRef as MutableRefObject<IsPressedKey>;
}

export default usePressedKey;
