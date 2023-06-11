import React from 'react';
import { Button, Grid, Typography } from '@mui/material';

interface Item {
  fontSize: number;
  text: string;
}

type Props = {
  items: Item[];
  onClick: (arg: Item) => void;
};

function TextList({ items, onClick }: Props) {
  return (
    <Grid container flexDirection="column" alignItems="center" rowGap={2}>
      {items.map((item, index) => (
        <Button key={index} variant="outlined" onClick={() => onClick(item)}>
          <Typography fontSize={item.fontSize}>{item.text}</Typography>
        </Button>
      ))}
    </Grid>
  );
}

export default TextList;
