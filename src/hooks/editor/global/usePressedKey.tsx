import { useEffect, useRef } from 'react';
import { fromEvent, merge } from 'rxjs';
import { map, filter } from 'rxjs/operators';

function usePressedKey() {
  const initialValue = {
    Shift: false,
    Control: false,
  };

  const pressedKeyRef = useRef<{ [key in string]: boolean }>(initialValue);

  const keyDown$ = fromEvent<KeyboardEvent>(window, 'keydown').pipe(
    filter(e => pressedKeyRef.current[e.key] !== undefined),
    map(e => ({ key: e.key, isPressed: true }))
  );

  const keyUp$ = fromEvent<KeyboardEvent>(window, 'keyup').pipe(
    filter(e => pressedKeyRef.current[e.key] !== undefined),
    map(e => ({ key: e.key, isPressed: false }))
  );

  const key$ = merge(keyDown$, keyUp$);

  useEffect(() => {
    const subscription = key$.subscribe(({ key, isPressed }) => {
      pressedKeyRef.current[key] = isPressed;
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    isKeyPressed: (...keys: (keyof typeof initialValue)[]) =>
      keys.every(key => pressedKeyRef.current[key]),
  };
}

export default usePressedKey;
