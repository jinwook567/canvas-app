import React, { ForwardedRef } from 'react';
import { GroupElement, Group, elements } from 'entities/group';
import { Shape } from 'features/shape';
import { GroupChild } from './types';

function Element(config: GroupChild, ref: ForwardedRef<GroupElement>) {
  return config.type === 'group' ? (
    <Group {...config} ref={ref}>
      {elements(config).map(element => (
        <Element {...element} key={element.id} />
      ))}
    </Group>
  ) : (
    <Shape {...config} />
  );
}

export default Element;
