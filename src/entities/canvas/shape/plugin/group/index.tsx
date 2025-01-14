import {
  GroupConfig,
  GroupElement,
} from 'entities/canvas/shape/plugin/group/model';
import { toNodeElement } from 'entities/node/model';
import {
  ShapeEvents,
  adaptShapeEvents,
} from 'entities/canvas/shape/core/model';
import React, { ForwardedRef } from 'react';
import * as ReactKonva from 'react-konva';
import { setRef, HasChildren, omit } from 'shared/lib';

type Props = GroupConfig & ShapeEvents;

function Group(
  { children, ...args }: HasChildren<Props>,
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

export default React.forwardRef<GroupElement, HasChildren<Props>>(Group);
