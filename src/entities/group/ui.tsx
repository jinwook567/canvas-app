import { GroupConfig, GroupElement } from './model';
import {
  ShapeEvents,
  adaptConfig,
  adaptShapeEvents,
  toContainerElement,
} from 'shared/canvas';
import React, { ForwardedRef, PropsWithChildren } from 'react';
import * as ReactKonva from 'react-konva';
import { setRef, omit } from 'shared/lib';

type Props<Child> = GroupConfig<Child> & ShapeEvents;

function Group<Child>(
  { children, ...args }: PropsWithChildren<Props<Child>>,
  ref: ForwardedRef<GroupElement>
) {
  return (
    <ReactKonva.Group
      {...omit(
        adaptConfig({ ...args, width: 0, height: 0 }),
        'width',
        'height'
      )}
      {...adaptShapeEvents(omit(args, 'elements'))}
      ref={node => node && setRef(ref, toContainerElement(node))}
    >
      {children}
    </ReactKonva.Group>
  );
}

export default React.forwardRef(Group);
