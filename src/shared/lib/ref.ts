import { ForwardedRef } from 'react';

export function setRef<T>(ref: ForwardedRef<T>, node: T) {
  const f =
    typeof ref === 'function'
      ? ref
      : isRefObject(ref)
      ? (node: T) => {
          ref.current = node;
        }
      : () => null;

  f(node);
}

function isRefObject(ref: unknown) {
  return ref !== null && typeof ref === 'object' && 'current' in ref;
}
