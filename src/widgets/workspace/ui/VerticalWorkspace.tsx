import React, { ForwardedRef, forwardRef, useImperativeHandle } from 'react';
import {
  Ids,
  Workspace,
  Node,
  toTransformable,
  transformerConfigByIds,
  update,
  Id,
  getChildren,
  toConfig,
  get,
  HasParent,
  toNode,
} from '../model';
import { css } from '@emotion/react';
import Element from './Element';
import { useRefs } from 'shared/dom';
import { NodeElement } from 'shared/canvas';

type Props = {
  workspace: Workspace;
  onChange: (ws: Workspace) => void;
  selectedIds: Ids;
  onSelect: (id: Id) => void;
  root: Node<'root'>;
};

function VerticalWorkspace(
  { workspace, onChange, selectedIds, onSelect, root }: Props,
  ref: ForwardedRef<() => NodeElement[]>
) {
  const configs = getChildren(workspace, root)
    .map(node => toConfig(workspace, node))
    .map(config =>
      toTransformable(config, [transformerConfigByIds(selectedIds)])
    );

  const { update: updateRef, vals } = useRefs<NodeElement>();

  useImperativeHandle(ref, () => vals);

  return (
    <div
      css={css`
        padding: 30px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;
      `}
    >
      {configs.map(config => (
        <Element
          key={config.id}
          config={config}
          onChange={configs => {
            onChange(
              configs.reduce((ws, config) => {
                const node = get(ws, config.id) as Node<HasParent>;
                return update(ws, toNode(config, node.parent));
              }, workspace)
            );
          }}
          onClick={id => {
            onSelect(id);
          }}
          ref={el => el && updateRef(config.id, el)}
        />
      ))}
    </div>
  );
}

export default forwardRef(VerticalWorkspace);
