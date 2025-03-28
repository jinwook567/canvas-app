import React, { ForwardedRef, forwardRef } from 'react';
import { Config, get, Type } from './model';
import { ShapeEvents, ShapeElement } from 'shared/canvas';

type Props<T extends Type> = Config<T> & ShapeEvents;

function Shape<T extends Type>(
  props: Props<T>,
  ref: ForwardedRef<ShapeElement>
) {
  const { Component } = get(props.type)(props);
  return <Component {...props} ref={ref} />;
}

export default forwardRef(Shape);
