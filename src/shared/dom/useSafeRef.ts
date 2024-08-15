import { useRef } from 'react';
import { Maybe } from 'shared/lib';

type SetRef<T> = (node: T) => void;
type MapRef<T> = <P>(
  f: (arg: NonNullable<T>) => P
) => ReturnType<typeof Maybe.fromNullable<P | null>>;

function useSafeRef<T>() {
  const ref = useRef<T>(null);

  const set = <T>(ref: { current: T }, node: T) => {
    ref.current = node;
  };

  const setRef: SetRef<T> = node => {
    set(ref, node);
  };

  const mapRef: MapRef<T> = f =>
    Maybe.fromNullable(ref.current ? f(ref.current) : null);

  const safeRef = () => Maybe.fromNullable(ref.current);

  return { setRef, mapRef, safeRef };
}

export default useSafeRef;
