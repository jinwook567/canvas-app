import React from 'react';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import DownloadIcon from '@mui/icons-material/Download';
import IconButtonList from '../../common/IconButtonList/IconButtonList';

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
          icon: <UndoIcon fontSize="medium" />,
          buttonProps: { onClick: handleUndo },
        },
        {
          icon: <RedoIcon fontSize="medium" />,
          buttonProps: { onClick: handleRedo },
        },
        {
          icon: <DownloadIcon fontSize="medium" />,
          buttonProps: { onClick: handleRequestExport },
        },
      ]}
    />
  );
}

export default HeadControlBar;
