import { Grid } from '@mui/material';
import React, { useEffect } from 'react';

type Props = {
  onSelect: () => void;
  onDeselect: () => void;
  children: React.ReactNode;
};

function StageSelector({ onSelect, onDeselect, children }: Props) {
  useEffect(() => {
    onSelect();
    return () => {
      onDeselect();
    };
  }, []);

  return <Grid onClick={onSelect}>{children}</Grid>;
}

export default StageSelector;
