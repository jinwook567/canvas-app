/* eslint-disable no-param-reassign */
import React, { useRef } from 'react';
import Maybe from '../../../utils/maybe';

type SetRef<T> = (node: T) => void;
type MapRef<T> = <P>(
  f: (arg: NonNullable<T>) => P
) => ReturnType<typeof Maybe.fromNullable<P | null>>;

type Props<T> = {
  children: ({
    setRef,
    mapRef,
    safeRef,
  }: {
    setRef: SetRef<T>;
    mapRef: MapRef<T>;
    safeRef: () => ReturnType<typeof Maybe.fromNullable<T | null>>;
  }) => React.ReactNode;
};

function RefProvider<T>({ children }: Props<T>) {
  const ref = useRef<T>(null);

  const set = <T,>(ref: { current: T }, node: T) => {
    ref.current = node;
  };

  const setRef: SetRef<T> = node => {
    set(ref, node);
  };

  const mapRef: MapRef<T> = f =>
    Maybe.fromNullable(ref.current ? f(ref.current) : null);

  const safeRef = () => Maybe.fromNullable(ref.current);

  return <>{children({ setRef, mapRef, safeRef })}</>;
}

export default RefProvider;
