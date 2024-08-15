import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButtonList } from 'shared/ui';

type Props = {
  onAppendStage: () => void;
  onDeleteStage: () => void;
  onSelectDown?: () => void;
  onSelectUp?: () => void;
};

function StageControlBar({
  onAppendStage,
  onDeleteStage,
  onSelectDown,
  onSelectUp,
}: Props) {
  const handleAppendStage = () => {
    onAppendStage();
  };

  const handleDeleteStage = () => {
    onDeleteStage();
  };

  const handleSelectUp = () => {
    if (onSelectUp) onSelectUp();
  };

  const handleSelectDown = () => {
    if (onSelectDown) onSelectDown();
  };

  return (
    <IconButtonList
      items={[
        {
          icon: <KeyboardArrowUpIcon fontSize="small" />,
          buttonProps: {
            onClick: handleSelectUp,
            disabled: !onSelectUp,
          },
        },
        {
          icon: <KeyboardArrowDownIcon fontSize="small" />,
          buttonProps: {
            onClick: handleSelectDown,
            disabled: !onSelectDown,
          },
        },
        {
          icon: <AddCircleOutlineIcon fontSize="small" />,
          buttonProps: {
            onClick: handleAppendStage,
          },
        },
        {
          icon: <DeleteIcon fontSize="small" />,
          buttonProps: {
            onClick: handleDeleteStage,
          },
        },
      ]}
    />
  );
}

export default StageControlBar;
