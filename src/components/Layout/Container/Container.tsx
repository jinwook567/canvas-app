import { Grid } from '@mui/material';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

function Container({ children }: Props) {
  return (
    <Grid sx={{ height: '100vh' }} container flexDirection="column">
      {children}
    </Grid>
  );
}

export default Container;
