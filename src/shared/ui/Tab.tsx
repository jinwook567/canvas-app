import React, { ReactElement } from 'react';
import MuiTab from '@mui/material/Tab';

type Props = {
  label: string;
  icon: ReactElement;
};

function Tab({ label, icon }: Props) {
  return <MuiTab icon={icon} label={label} />;
}

export default Tab;
