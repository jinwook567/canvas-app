import React, { ElementRef, ForwardedRef, ReactNode } from 'react';
import { Type, Config, get, Item } from './model';
import { ContainerElement, NodeElement, ShapeEvents } from 'shared/canvas';

type Props<T extends Type> = T extends 'group'
  ? Config<T> & ShapeEvents
  : Config<T>;

function Container<T extends Type>(
  props: Props<T> & {
    children: (arg: {
      elements: Item<T>['elements'];
      Element: Item<T>['Element'];
    }) => ReactNode;
  },
  ref: ForwardedRef<ContainerElement>
) {
  const { Component, elements, Element } = get(props.type)(props);

  return (
    <Component {...props} ref={ref}>
      {props.children({ elements, Element })}
    </Component>
  );
}

export default Container;
