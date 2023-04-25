import React, { useCallback } from 'react';
import { KonvaNodeComponent, KonvaNodeEvents } from 'react-konva';
import Konva from 'konva';
import { NodeConfig } from 'konva/lib/Node';

type Props<Ref extends Konva.Node, Config extends NodeConfig> = {
  id: string;
  config: Config;
  component: KonvaNodeComponent<Ref, Config>;
  childNodes?: Props<Ref, Config>[];
  setNode?: (node: Ref | null) => void;
} & KonvaNodeEvents;

// children 관련 타입 생각해보기.

function KonvaComponent<Ref extends Konva.Node, Config extends NodeConfig>({
  id,
  setNode,
  component: Component,
  config,
  childNodes,
  ...events
}: Props<Ref, Config>) {
  const ref = useCallback(
    (node: Ref) => {
      if (node && setNode) setNode(node);
    },
    [setNode]
  );
  return (
    <Component ref={ref} {...config} {...events} id={id}>
      {childNodes?.map(child => (
        <KonvaComponent
          key={child.id}
          id={child.id}
          config={{ ...child.config, draggable: false }}
          component={child.component}
        />
      ))}
    </Component>
  );
}

export default KonvaComponent;
