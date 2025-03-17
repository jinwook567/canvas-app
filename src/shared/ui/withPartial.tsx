import React, { ComponentType } from 'react';
import { EmotionJSX } from '@emotion/react/dist/declarations/src/jsx-namespace';

function withPartial<T, P extends Partial<T>>(
  Component: ComponentType<T>,
  props1: P
) {
  return function Wrapper(props2: Omit<T, keyof P>) {
    const props = {
      ...props1,
      ...props2,
    } as unknown as EmotionJSX.LibraryManagedAttributes<typeof Component, T> &
      EmotionJSX.IntrinsicAttributes;

    return <Component {...props} />;
  };
}

export default withPartial;
