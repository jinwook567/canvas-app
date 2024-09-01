import React, { ForwardedRef, ForwardRefExoticComponent } from 'react';
import {
  component,
  PackageName,
  Config,
} from 'entities/canvas/shape/plugin/package';
import { shapes } from 'entities/canvas/shape/plugin/group/model';
import { ShapeElement, ShapeEvents } from 'entities/canvas/shape/core/model';

type Props<T extends PackageName> = Config<T> & ShapeEvents;

function isGroup<T extends PackageName>(
  args: Props<T>
): args is Props<'group'> {
  return args.type === 'group';
}

function Shape<T extends PackageName>(
  args: Props<T>,
  ref: ForwardedRef<ShapeElement>
) {
  if (isGroup(args)) {
    const GroupComponent = component(args.type);
    return (
      <GroupComponent {...args} ref={ref}>
        {shapes(args).map((shape, index) => (
          <Shape {...shape} key={index} />
        ))}
      </GroupComponent>
    );
  }

  const Component = component(args.type) as ForwardRefExoticComponent<
    Config<T>
  >;
  return <Component {...args} ref={ref} />;
}

export default React.forwardRef(Shape);
