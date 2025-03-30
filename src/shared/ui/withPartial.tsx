import React, {
  ForwardedRef,
  forwardRef,
  PropsWithoutRef,
  ForwardRefExoticComponent,
  ComponentType,
} from 'react';
import { EmotionJSX } from '@emotion/react/dist/declarations/src/jsx-namespace';

function withPartial<T, P extends Partial<T>>(
  Component: ForwardRefExoticComponent<T> | ComponentType<T>,
  props1: P
) {
  function Wrapper<U>(
    props2: PropsWithoutRef<Omit<T, keyof P>>,
    ref: ForwardedRef<U>
  ) {
    const props = {
      ...props1,
      ...props2,
    } as unknown as EmotionJSX.LibraryManagedAttributes<
      ForwardRefExoticComponent<T>,
      T
    > &
      EmotionJSX.IntrinsicAttributes & { ref: ForwardedRef<U> };

    return <Component {...props} ref={ref} />;
  }

  return forwardRef(Wrapper);
}

export default withPartial;
