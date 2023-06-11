import { useEffect } from 'react';

type Props<T> = {
  value: T;
  watchers: ((newValue: T) => void)[];
};

function Observer<T>({ value, watchers }: Props<T>) {
  useEffect(() => {
    watchers.forEach(watcher => watcher(value));
  }, [value]);
  return null;
}

export default Observer;
