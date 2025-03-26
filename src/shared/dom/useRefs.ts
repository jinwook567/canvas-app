import { useRef } from 'react';

type Id = string;

function useRefs<T>() {
  const ref = useRef<Map<Id, T>>(new Map());

  const get = (id: Id) => {
    return ref.current.get(id);
  };

  const update = (id: Id, node: T) => {
    ref.current.set(id, node);
  };

  const remove = (id: Id) => {
    ref.current.delete(id);
  };

  const vals = () => {
    return ref.current.values();
  };

  return {
    get,
    update,
    remove,
    vals,
  };
}

export default useRefs;
