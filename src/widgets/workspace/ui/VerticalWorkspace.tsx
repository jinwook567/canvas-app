import React from 'react';
import {
  Ids,
  Workspace,
  ByType,
  tree,
  toTransformable,
  transformerConfigByIds,
  Config,
  ChildrenTypes,
  update,
  Id,
} from '../model';
import { Type as ContainerType } from 'features/container';
import { css } from '@emotion/react';
import Element from './Element';

type Props = {
  workspace: Workspace;
  onChange: (ws: Workspace) => void;
  selectedIds: Ids;
  onSelect: (id: Id) => void;
  root: ByType<'root'>;
};

function VerticalWorkspace({
  workspace,
  onChange,
  selectedIds,
  onSelect,
  root,
}: Props) {
  const config = tree(workspace, root);
  const transformableConfigs = config.elements.map(config =>
    toTransformable(config as Config<ContainerType>, [
      transformerConfigByIds(selectedIds),
    ])
  );

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
          config={config as Config<ChildrenTypes>}
          onChange={configs => {
            onChange(
              configs.reduce((ws, config) => update(ws, config), workspace)
            );
          }}
          onClick={id => {
            onSelect(id);
          }}
        />
      ))}
    </div>
  );
}

export default VerticalWorkspace;
