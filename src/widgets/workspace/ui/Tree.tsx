import React, { useRef } from 'react';
import { ByType, Ids, ParentTypes, tree, Workspace } from '../model';
import {
  isContainer,
  Container,
  toTransformLayer,
  Config as ContainerConfig,
} from 'features/container';
import { Shape } from 'features/shape';
import { ContainerElement } from 'shared/canvas';

type Props = {
  workspace: Workspace;
  onChange?: (workspace: Workspace) => void;
  selectedIds?: Ids;
  onSelect?: (ids: Ids) => void;
  root: ByType<ParentTypes>;
};

function Tree(props: Props) {
  const { workspace, onChange, selectedIds, onSelect, root } = props;

  const transformers = selectedIds
    ? [
        {
          type: 'transformer' as const,
          ratio: 'fixed' as const,
          resize: true,
          rotate: false,
          flip: false,
          elements: [...selectedIds.values()],
          id: 'player1',
        },
      ]
    : [];

  const ref = useRef<ContainerElement>(null);

  if (root.type === 'root') {
    const k = tree(workspace, root);
    return k.elements.map(el => (
      <Tree key={el.id} {...{ ...props, root: el }} />
    ));
  }

  const u = tree(workspace, root);
  const config = u.type === 'layer' ? toTransformLayer(u, transformers) : u;

  return (
    <Container {...(config as ContainerConfig<(typeof u)['type']>)} ref={ref}>
      {config.elements.map(el =>
        isContainer(el) ? (
          <Tree key={el.id} {...{ ...props, root: el }} />
        ) : (
          <Shape key={el.id} {...el} />
        )
      )}
    </Container>
  );
}

export default Tree;
