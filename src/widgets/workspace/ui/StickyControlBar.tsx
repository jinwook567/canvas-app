import React from 'react';
import { Typography } from '@mui/material';
import { Control } from '../model';
import ControlBar from './ControlBar';

type Props = {
  control: Control;
};

function StickyControlBar({ control }: Props) {
  const controls = [
    {
      type: 'text' as const,
      disabled: control.selectedIds.size === 0,
      control: control.remove,
      button: <Typography variant="body2">삭제</Typography>,
    },
  ];

  return <ControlBar controls={controls} />;
}

export default StickyControlBar;
