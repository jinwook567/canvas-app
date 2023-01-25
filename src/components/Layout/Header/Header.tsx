import { Grid } from '@mui/material';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

function Header({ children }: Props) {
  return <Grid sx={{ padding: 1, background: 'blue' }}>{children}</Grid>;
}

export default Header;