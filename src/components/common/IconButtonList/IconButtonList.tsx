import { Grid, IconButton, IconButtonProps } from '@mui/material';
import React from 'react';

type Props = {
  columnGap?: number;
  items: {
    icon: React.ReactNode;
    buttonProps: IconButtonProps;
  }[];
};

function IconButtonList({ columnGap, items }: Props) {
  return (
    <Grid columnGap={columnGap || 0} container>
      {items.map((item, index) => (
        <IconButton key={index} {...item.buttonProps}>
          {item.icon}
        </IconButton>
      ))}
    </Grid>
  );
}

export default IconButtonList;
