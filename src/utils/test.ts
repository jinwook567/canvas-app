import { useEffect } from 'react';
import { RecoilState, useRecoilValue } from 'recoil';

type ObserverArgs<T> = {
  node: RecoilState<T>;
  onChange: (value: unknown) => void;
};

export function RecoilObserver<T>({ node, onChange }: ObserverArgs<T>) {
  const value = useRecoilValue(node);
  useEffect(() => onChange(value), [onChange, value]);
  return null;
}

export default {};
