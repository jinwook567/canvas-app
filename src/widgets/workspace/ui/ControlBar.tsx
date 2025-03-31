import React from 'react';
import { Button, Grid, IconButton } from '@mui/material';

type Props = {
  controls: {
    disabled?: boolean;
    type: 'icon' | 'text';
    button: React.ReactNode;
    control: () => void;
  }[];
};

function ControlBar({ controls }: Props) {
  return (
    <Grid columnGap={1} container>
      {controls.map(({ disabled, type, button, control }, index) =>
        type === 'icon' ? (
          <IconButton disabled={disabled} onClick={control} key={index}>
            {button}
          </IconButton>
        ) : (
          <Button
            disabled={disabled}
            onClick={control}
            variant={'outlined'}
            key={index}
          >
            {button}
          </Button>
        )
      )}
    </Grid>
  );
}

export default ControlBar;
