import React, { ComponentProps, ForwardedRef, forwardRef } from 'react';
import { Type, Config, get, Item } from './model';
import { ContainerElement } from 'shared/canvas';

type Props<T extends Type> = ComponentProps<Item<T>['Component']> & Config<T>;

function Container<T extends Type>(
  props: Props<T>,
  ref: ForwardedRef<ContainerElement>
) {
  const { Component } = get(props);

  return (
    <Component {...props} ref={ref}>
      {props.children}
    </Component>
  );
}

export default forwardRef(Container);
