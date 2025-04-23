import React from 'react';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import DownloadIcon from '@mui/icons-material/Download';
import { Control } from '../model';
import { NodeElement } from 'shared/canvas';
import ControlBar from './ControlBar';
import { saveBase64 } from 'shared/lib';

type Props = {
  control: Control;
  elements: () => NodeElement[];
};

function TopControlBar({ control, elements }: Props) {
  const controls = [
    {
      type: 'icon' as const,
      button: <UndoIcon fontSize="small" sx={{ color: 'white' }} />,
      control: control.undo,
    },
    {
      type: 'icon' as const,
      button: <RedoIcon fontSize="small" sx={{ color: 'white' }} />,
      control: control.redo,
    },
    {
      type: 'icon' as const,
      button: <DownloadIcon fontSize="small" sx={{ color: 'white' }} />,
      control: () => {
        const request = elements().map((el, index) => ({
          base64: el.base64(),
          name: `${index}`,
          format: 'png' as const,
        }));
        saveBase64(request);
      },
    },
  ];

  return <ControlBar controls={controls} />;
}

export default TopControlBar;
