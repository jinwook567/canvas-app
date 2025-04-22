import React from 'react';
import { Type, get } from '../model';
import { HasParent, Config } from 'widgets/workspace/model';

type Props = { type: Type; onClick: (config: Config<HasParent>) => void };

function Panel({ type, ...props }: Props) {
  const Component = get(type).PanelComponent;
  return <Component {...props} />;
}

export default Panel;
