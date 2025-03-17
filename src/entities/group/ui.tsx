import { GroupConfig, GroupElement } from './model';
import {
  toNodeElement,
  ShapeEvents,
  adaptShapeEvents,
  ShapeConfig,
} from 'shared/canvas';
import React, { ForwardedRef } from 'react';
import * as ReactKonva from 'react-konva';
import { setRef, HasChildren, omit } from 'shared/lib';

type Props<Child extends ShapeConfig> = GroupConfig<Child> & ShapeEvents;

function Group<Child extends ShapeConfig>(
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
