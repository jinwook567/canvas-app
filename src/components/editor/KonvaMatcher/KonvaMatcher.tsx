import React from 'react';
import { KonvaNodeComponent, KonvaNodeEvents } from 'react-konva';
import Konva from 'konva';
import { NodeConfig } from 'konva/lib/Node';

type Props<Ref extends Konva.Node, Config extends NodeConfig> = {
  id: string;
  config: Config;
  component: KonvaNodeComponent<Ref, Config>;
  childNodes?: (Props<Ref, Config> & { children?: Props<Ref, Config>[] })[];
  setNode?: (node: Ref | null) => void;
} & KonvaNodeEvents;

function KonvaMatcher<Node extends Konva.Node, Config extends NodeConfig>({
  id,
  component: Component,
  config,
  childNodes,
  setNode,
  ...events
}: Props<Node, Config>) {
  return (
    <Component id={id} ref={setNode} {...config} {...events}>
      {childNodes?.map(child => (
        <KonvaMatcher
          key={child.id}
          id={child.id}
          config={{ ...child.config, draggable: false }}
          component={child.component}
          childNodes={child.children}
        />
      ))}
    </Component>
  );
}

export default KonvaMatcher;
