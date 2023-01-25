import { Grid } from '@mui/material';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

function Footer({ children }: Props) {
  return <Grid sx={{ padding: 1, background: 'gray' }}>{children}</Grid>;
}

export default Footer;
