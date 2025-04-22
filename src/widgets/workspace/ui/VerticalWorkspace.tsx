import React, {
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  Ids,
  Workspace,
  Node,
  tree,
  toTransformable,
  transformerConfigByIds,
  Config,
  HasParent,
  update,
  Id,
  giveHierarchy,
} from '../model';
import { Type as ContainerType } from 'features/container';
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
  const config = tree(workspace, root);
  const transformableConfigs = config.elements.map(config =>
    toTransformable(config as Config<ContainerType>, [
      transformerConfigByIds(selectedIds),
    ])
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
      {transformableConfigs.map(config => (
        <Element
          key={config.id}
          config={config as Config<HasParent>}
          onChange={configs => {
            onChange(
              configs.reduce((ws, config) => {
                return update(ws, giveHierarchy(ws, config));
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
