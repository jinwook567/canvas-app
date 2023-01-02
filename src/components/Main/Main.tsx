import React from 'react';
import { Grid } from '@mui/material';

type Props = {
  children: React.ReactNode;
};

function Main({ children }: Props) {
  return (
    <Grid component="main" container sx={{ flex: 1 }}>
      {children}
    </Grid>
  );
}

export default Main;
