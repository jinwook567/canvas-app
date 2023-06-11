import { Grid, Typography } from '@mui/material';
import React from 'react';

type Props = {
  icon: React.ReactNode;
  label: string;
};

function IconWithLabel({ icon, label }: Props) {
  return (
    <Grid container alignItems="center" flexDirection="column">
      <Grid item>{icon}</Grid>
      <Grid item>
        <Typography variant="body2">{label}</Typography>
      </Grid>
    </Grid>
  );
}

export default IconWithLabel;
