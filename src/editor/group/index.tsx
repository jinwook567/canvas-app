import { GroupConfig, GroupElement } from 'editor/group/service';
import { convertNode } from 'editor/node';
import { ShapeEvents, convertEvent } from 'editor/shape';
import React, { ForwardedRef } from 'react';
import * as ReactKonva from 'react-konva';
import { setRef } from 'utils/ref';
import { HasChildren } from 'utils/type-utils';
import { omit } from 'utils/unit';

type Props = GroupConfig & ShapeEvents;

function Group(
  { children, ...args }: HasChildren<Props>,
  ref: ForwardedRef<GroupElement>
) {
  return (
    <ReactKonva.Group
      {...convertEvent(omit(args, 'shapes'))}
      ref={node => node && setRef(ref, convertNode(node))}
    >
      {children}
    </ReactKonva.Group>
  );
}

export default React.forwardRef<GroupElement, HasChildren<Props>>(Group);
