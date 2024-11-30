import React, { ForwardedRef, ForwardRefExoticComponent } from 'react';
import {
  component,
  PackageName,
  Config,
} from 'entities/canvas/shape/plugin/package';
import { ShapeElement, ShapeEvents } from 'entities/canvas/shape/core/model';

export type Props<T extends PackageName> = T extends 'group'
  ? Config<'group'> & { children: Props<T>[] }
  : Config<T>;

function Shape<T extends PackageName>(
  args: Props<T> & ShapeEvents,
  ref: ForwardedRef<ShapeElement>
) {
  if (args.type == 'group') {
    const GroupComponent = component(args.type);
    return (
      <GroupComponent {...args} ref={ref}>
        {args.children.map((shape, index) => (
          <Shape {...shape} key={index} />
        ))}
      </GroupComponent>
    );
  }

  const Component = component(args.type) as ForwardRefExoticComponent<
    Config<T> & ShapeEvents
  >;
  return <Component {...(args as any)} ref={ref} />;
}

export default React.forwardRef(Shape);
