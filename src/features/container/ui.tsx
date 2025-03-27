import React, {
  ComponentProps,
  ComponentType,
  ForwardedRef,
  ForwardRefExoticComponent,
  ReactNode,
} from 'react';
import { Type, Config, get, Item, getElement } from './model';
import { ContainerElement, ShapeEvents } from 'shared/canvas';

type Props<T extends Type> = T extends 'group'
  ? Config<T> & ShapeEvents
  : Config<T>;

// type U<T extends Type> = Omit<
//   ComponentProps<Item<T>['Component']>,
//   'children'
// > &
//   Config<T>;
// type K = U<'layer'>['onTransform'];

function Container<T extends Type>(
  props: Props<T> & {
    children: (arg: {
      elements: Item<T>['elements'];
      Element: ForwardRefExoticComponent<Item<T>['elements'][number]>;
    }) => ReactNode;
  },
  ref: ForwardedRef<ContainerElement>
) {
  const { Component, elements } = get(props.type)(props);
  const Element = getElement(props);

  return (
    <Component {...props}>{props.children({ elements, Element })}</Component>
  );
}

export default Container;
