import { Button, Grid, Typography } from '@mui/material';
import React from 'react';

type Props = {
  items: { fontSize: number; text: string }[];
  onClick: (arg: { fontSize: number; text: string }) => void;
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
