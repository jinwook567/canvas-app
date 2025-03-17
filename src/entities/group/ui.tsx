import { GroupConfig, GroupElement } from './model';
import { toNodeElement, ShapeEvents, adaptShapeEvents } from 'shared/canvas';
import React, { ForwardedRef } from 'react';
import * as ReactKonva from 'react-konva';
import { setRef, HasChildren, omit } from 'shared/lib';

type Props<Child> = GroupConfig<Child> & ShapeEvents;

function Group<Child>(
  { children, ...args }: HasChildren<Props<Child>>,
  ref: ForwardedRef<GroupElement>
) {
  return (
    <ReactKonva.Group
      {...adaptShapeEvents(omit(args, 'shapes'))}
      ref={node => node && setRef(ref, toNodeElement(node))}
    >
      {children}
    </ReactKonva.Group>
  );
}

export default React.forwardRef(Group);
