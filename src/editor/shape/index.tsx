import React, { ForwardRefExoticComponent } from 'react';
import * as shapePackage from 'editor/shape/package';
import { component } from 'editor/shape/service';

type ShapePackage = typeof shapePackage;

type Props<T extends keyof ShapePackage> = Parameters<
  ShapePackage[T]['component']
>[0];

function isGroup<T extends keyof ShapePackage>(
  args: Props<T>
): args is Props<'group'> {
  return args.type === 'group';
}

function Shape<T extends keyof ShapePackage>(args: Props<T>) {
  if (isGroup(args)) {
    const GroupComponent = component(args.type);
    return (
      <GroupComponent {...args}>
        {args.shapes.map((shape, index) => (
          <Shape {...shape} key={index} />
        ))}
      </GroupComponent>
    );
  }

  const Component = component(args.type) as ForwardRefExoticComponent<Props<T>>;
  return <Component {...args} />;
}

export default Shape;
