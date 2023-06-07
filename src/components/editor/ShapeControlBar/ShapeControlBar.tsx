import React from 'react';
import { Button, Grid, Typography } from '@mui/material';

type Props = {
  onGroup?: () => void;
  onUnGroup?: () => void;
  onRemove?: () => void;
};

function ShapeControlBar({ onGroup, onRemove, onUnGroup }: Props) {
  const buttons = [
    { name: '그룹화', onClick: onGroup },
    { name: '그룹해제', onClick: onUnGroup },
    { name: '삭제', onClick: onRemove },
  ];

  return (
    <Grid
      padding={1}
      columnGap={1}
      container
      sx={{
        background: 'white',
        width: 1,
        position: 'sticky',
        top: 0,
        zIndex: 999,
      }}
    >
      {buttons.map(({ name, onClick }, index) => (
        <ControlButton name={name} onClick={onClick} key={index} />
      ))}
    </Grid>
  );
}

function ControlButton({
  name,
  onClick,
}: {
  name: string;
  onClick?: () => void;
}) {
  return (
    <Button
      variant="outlined"
      disabled={!onClick}
      onClick={() => onClick && onClick()}
    >
      <Typography variant="body2">{name}</Typography>
    </Button>
  );
}

export default ShapeControlBar;
