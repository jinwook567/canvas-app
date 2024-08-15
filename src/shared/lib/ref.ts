import { ForwardedRef } from 'react';

export function setRef<T>(ref: ForwardedRef<T>, node: T) {
  const f =
    typeof ref === 'function'
      ? ref
      : ref === null
      ? () => null
      : (node: T) => {
          ref.current = node;
        };

  f(node);
}
