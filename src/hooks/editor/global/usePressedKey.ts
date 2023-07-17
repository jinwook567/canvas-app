import { useEffect, useRef } from 'react';
import { fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';

function usePressedKey(
  f?: (isSelected: (...keys: string[]) => boolean) => void
) {
  const pressedKeyRef = useRef<{ [key in string]: boolean }>({});

  const keyDown$ = fromEvent<KeyboardEvent>(window, 'keydown').pipe(
    map(e => ({ key: e.key, isPressed: true, e }))
  );

  const keyUp$ = fromEvent<KeyboardEvent>(window, 'keyup').pipe(
    map(e => ({ key: e.key, isPressed: false, e }))
  );

  const key$ = merge(keyDown$, keyUp$);

  const isKeyPressed = (...keys: string[]) =>
    keys.every(key => pressedKeyRef.current[key]);

  useEffect(() => {
    const subscription = key$.subscribe(({ key, isPressed, e }) => {
      if (key === 'Meta' && !isPressed) pressedKeyRef.current = {};
      pressedKeyRef.current[key] = isPressed;

      if (f) {
        f((...keys: string[]) => {
          const allKeysPressed = isKeyPressed(...keys);
          if (allKeysPressed) e.preventDefault();
          return allKeysPressed;
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [f]);

  return {
    isKeyPressed,
  };
}

export default usePressedKey;
