import React from 'react';
import { types, get, Type } from '../model';
import MuiTabs from '@mui/material/Tabs';
import MuiTab, { TabProps } from '@mui/material/Tab';

type Props = {
  onClick: (type: Type) => void;
  value: Type;
};

function Tab({ onClick, value }: Props) {
  const index = types.findIndex(type => type === value);

  return (
    <MuiTabs
      orientation="vertical"
      value={index}
      onChange={(_, i) => onClick(types[i])}
    >
      {types
        .map(type => get(type).Tab)
        .map((Component, index) => (
          <Component key={index} />
        ))}
    </MuiTabs>
  );
}

export default Tab;
