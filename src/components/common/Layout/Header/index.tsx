import { Grid } from '@mui/material';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

function Header({ children }: Props) {
  return (
    <Grid
      sx={{
        padding: 1,
        background: 'linear-gradient(to right, #00c4cc, #7300e6)',
      }}
    >
      {children}
    </Grid>
  );
}

export default Header;
