import React from 'react';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import DownloadIcon from '@mui/icons-material/Download';
import IconButtonList from 'components/common/IconButtonList';

type Props = {
  onRequestExport: () => void;
  onRedo: () => void;
  onUndo: () => void;
};

function HeadControlBar({ onRequestExport, onRedo, onUndo }: Props) {
  const handleRequestExport = () => {
    onRequestExport();
  };

  const handleRedo = () => {
    onRedo();
  };

  const handleUndo = () => {
    onUndo();
  };

  return (
    <IconButtonList
      columnGap={1}
      items={[
        {
          icon: <UndoIcon fontSize="small" sx={{ color: 'white' }} />,
          buttonProps: { onClick: handleUndo },
        },
        {
          icon: <RedoIcon fontSize="small" sx={{ color: 'white' }} />,
          buttonProps: { onClick: handleRedo },
        },
        {
          icon: <DownloadIcon fontSize="small" sx={{ color: 'white' }} />,
          buttonProps: { onClick: handleRequestExport },
        },
      ]}
    />
  );
}

export default HeadControlBar;
