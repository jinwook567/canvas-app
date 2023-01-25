import { Grid } from '@mui/material';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

function Container({ children }: Props) {
  return (
    <Grid sx={{ minHeight: '100vh' }} container flexDirection="column">
      {children}
    </Grid>
  );
}

export default Container;
