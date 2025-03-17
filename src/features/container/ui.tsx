import React, { ForwardedRef } from 'react';
import { Type, Config, get } from './model';
import { NodeElement, ShapeEvents } from 'shared/canvas';
import { Shape } from 'features/shape';

type Props<T extends Type> = T extends 'layer'
  ? Config<T>
  : Config<T> & ShapeEvents;

function Container<T extends Type>(
  props: Props<T>,
  ref: ForwardedRef<NodeElement>
) {
  const { Component, shapes } = get(props.type)(props);

  return (
    <Component {...props} ref={ref}>
      {shapes.map(shape =>
        shape.type === 'group' ? (
          <Container key={shape.id} {...shape} />
        ) : (
          <Shape key={shape.id} {...shape} />
        )
      )}
    </Component>
  );
}

export default Container;
