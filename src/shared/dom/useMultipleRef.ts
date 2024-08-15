import { useRef } from 'react';

function useMultipleRef<T>() {
  const ref = useRef<Map<string, T>>(new Map());

  const map = ref.current;

  const setRef = (id: string, node: T) => {
    if (node) {
      map.set(id, node);
    } else {
      map.delete(id);
    }
  };

  const mapRef = <K,>(f: (id: string, node: NonNullable<T>) => K) => {
    const res: K[] = [];
    map.forEach((node, id) => {
      if (node) res.push(f(id, node));
    });
    return res;
  };

  return {
    setRef,
    mapRef,
  };
}

export default useMultipleRef;
