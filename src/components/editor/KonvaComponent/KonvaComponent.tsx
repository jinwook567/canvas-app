import React, { useCallback } from 'react';
import { KonvaNodeComponent, KonvaNodeEvents } from 'react-konva';
import Konva from 'konva';
import { NodeConfig } from 'konva/lib/Node';

type Props<Ref extends Konva.Node, Config extends NodeConfig> = {
  id: string;
  config: Config;
  component: KonvaNodeComponent<Ref, Config>;
  childNodes?: Props<Ref, Config>[];
  setNode?: (node: Konva.Node | null) => void;
} & KonvaNodeEvents;

function KonvaComponent<Node extends Konva.Node, Config extends NodeConfig>({
  id,
  component: Component,
  config,
  childNodes,
  setNode,
  ...events
}: Props<Node, Config>) {
  const ref = useCallback(
    (node: Node) => {
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
